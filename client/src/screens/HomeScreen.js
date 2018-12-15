import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

import { getTasks } from "../graphql/queries";
import { removeTask } from "../graphql/mutations";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight:
      (
        <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        >
          <Icon
            name="ios-add"
            size={30}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      )
  });

  handleRemoveTask = (item) => {
    const { mutate } = this.props;
    mutate({
      variables: {
        id: item.id,
      },
    });
  };

  renderItem = ({item}) => {
    const swipeOutItems = [
      {
        text: 'Details',
        onPress: () => this.props.navigation.navigate('Detail', {
          title: item.title,
          content: item.content
        }),
        backgroundColor: 'green'
      },
      {
        text: 'Remove',
        onPress: () => this.handleRemoveTask(item),
        backgroundColor: 'red'
      },
      {
        text: 'Edit',
        onPress: () => this.props.navigation.navigate('Edit', { id: item.id }),
        backgroundColor: 'blue'
      }
    ];

    return (
      <Swipeout
        autoClose={true}
        left={swipeOutItems}
        style={styles.flatView}
      >
        <View>
          <Text style={styles.item}>{item.title.toUpperCase()}</Text>
        </View>
      </Swipeout>
    );
  };

  renderHeader = () => {
    return (
      <View>
        <Text style={styles.headerText}>Tasks</Text>
      </View>
    );
  };

  render() {
    const {
      data: {
        tasks
      }
    } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={tasks}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}
export default compose(
  graphql(getTasks),
  graphql(removeTask)
)(HomeScreen);

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
    padding: 10,
    backgroundColor: 'white'
  },
  headerIcon: {
    marginRight: 20
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 10
  }
});
