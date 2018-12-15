import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import { graphql } from 'react-apollo';

import { addTask } from "../graphql/mutations";

class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add',
  };

  state = {
    title: '',
    description: '',
  };

  handleAddTask = () => {
    const { mutate } = this.props;
    mutate({
      variables: {
        title: this.state.title,
        content: this.state.description,
      },
    }).then(() => this.props.navigation.goBack());
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputTitle}
          placeholder="Title"
          onChangeText={(title) => this.setState({title})}
        />
        <TextInput
          multiline={true}
          style={styles.inputDescription}
          placeholder="Description"
          onChangeText={(description) => this.setState({description})}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.handleAddTask}
        >
          <Text
            style={styles.submitButtonText}
          >
          ADD
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default graphql(addTask)(AddScreen);

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  inputTitle: {
    padding: 5,
    margin: 15,
    height: 40,
    borderColor: '#7e7e7e',
    borderWidth: 1
  },
  inputDescription: {
    padding: 5,
    margin: 15,
    height: 100,
    borderColor: '#7e7e7e',
    borderWidth: 1
  },
  submitButton: {
    padding: 10,
    backgroundColor: 'black',
    margin: 25,
    borderRadius: 40,
  },
  submitButtonText:{
    color: 'white',
    textAlign: 'center'
  }
});
