import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList
} from 'react-native';
import { graphql } from 'react-apollo';

import { getTasks } from '../graphql/queries';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  renderItem = ({item}) => (
    <View style={styles.flatView}>
      <Text style={styles.item}>{item.title.toUpperCase()}</Text>
    </View>
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
  },
  SearchBar: {
    paddingHorizontal: 10,
    margin: 10,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18
  },
  flatView: {
    padding: 20
  },
  dialog: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
