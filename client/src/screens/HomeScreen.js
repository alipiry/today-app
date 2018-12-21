import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Alert
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import { ListItem, SearchBar } from 'react-native-elements';

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

  state = {
    data: [],
    isSearching: false
  };

  handleRemoveTask = (item) => {
    const { mutate } = this.props;
    Alert.alert(
      'Are you sure you want to delete task?',
      '',
      [
        {
          text: 'Yes',
          onPress: () => {
            mutate({
              variables: {
                id: item.id,
              },
              refetchQueries: [
                {
                  query: getTasks,
                },
              ],
            })
          },
        },
        {
          text: 'No', onPress: () => {}, style: 'cancel'
        },
      ]
    );
  };

  renderItem = ({item}) => {
    const swipeOutItems = [
      {
        text: 'Remove',
        onPress: () => this.handleRemoveTask(item),
        backgroundColor: 'red'
      },
      {
        text: 'Edit',
        onPress: () => this.props.navigation.navigate('Edit', {
          id: item.id,
          title: item.title,
          content: item.content
        }),
        backgroundColor: 'blue'
      }
    ];

    return (
      <Swipeout
        autoClose={true}
        right={swipeOutItems}
        style={styles.flatView}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Detail', {
              title: item.title,
              content: item.content
            });
          }}
        >
          <ListItem
            title={item.title}
            subtitle={item.content}
            containerStyle={styles.listItem}
          />
        </TouchableOpacity>
      </Swipeout>
    );
  };

  showEmptyList = () => {
    return (
      <View style={styles.emptyListView}>
        <Text style={styles.emptyListText}>
          There is no task to do!
        </Text>
      </View>
    )
  };

  handleSearch = (text) => {
    const {
      data: {
        tasks
      }
    } = this.props;
    this.setState({ isSearching: true });

    const newData = tasks.filter(item => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
    });
  };

  handleOnClear = () => this.setState({ isSearching: false });

  render() {
    const {
      data: {
        tasks
      }
    } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Search"
          lightTheme
          round
          onChangeText={text => this.handleSearch(text)}
          onClear={this.handleOnClear}
          autoCorrect={false}
        />
        <FlatList
          data={this.state.isSearching ? this.state.data : tasks}
          renderItem={this.renderItem}
          ListEmptyComponent={this.showEmptyList}
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
  listItem: {
    borderBottomWidth: 0
  },
  emptyListView: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyListText: {
    fontSize: 20,
    opacity: 0.5
  }
});
