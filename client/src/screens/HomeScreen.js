import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import { graphql } from 'react-apollo';

import { getTasks } from "../graphql/queries";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  itemOptions = () =>
    Alert.alert(
      'Item',
      'Options',
      [
        {text: 'Edit', onPress: () => this.props.navigation.navigate('Edit')},
        {text: 'Remove', onPress: () => console.log('Remove Pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ],
      { cancelable: false }
    );

  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.flatView}
      onPress={this.itemOptions}
    >
      <Text style={styles.item}>{item.title.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  render() {
    const {
      data: {
        tasks
      }
    } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={tasks}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.button}>
          <Button
            title="Add"
            onPress={() => this.props.navigation.navigate('Add')}
            color="white"
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default graphql(getTasks)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 5,
    fontSize: 20,
    borderBottomWidth: 10,
  },
  flatView: {
    padding: 20,
  },
  button: {
    backgroundColor: 'black',
    margin: 25,
    borderRadius: 40,
  }
});
