import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert
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
    titleValidation: false,
    desValidation: false
  };

  handleAlert = () => {
    Alert.alert(
      'Task Added',
      '',
      [
        { text: 'Ok', onPress: () => this.props.navigation.goBack() , style: 'cancel' },
      ]
    );
  };

  handleAddTask = () => {
    const { mutate } = this.props;
    if (this.state.titleValidation && this.state.desValidation) {
      mutate({
        variables: {
          title: this.state.title,
          content: this.state.description,
        },
      }).then(() => this.handleAlert());
    } else {
      Alert.alert(
        'Title and Description field cannot be empty!',
        '',
        [
          { text: 'Ok', onPress: () => {} , style: 'cancel' },
        ]
      );
    }
  };

  handleTitle = (title) => {
    if (title.length > 0) {
      this.setState({title: title});
      this.setState({titleValidation: true});
    }
  };

  handleDescription = (description) => {
    if (description.length > 0) {
      this.setState({description});
      this.setState({desValidation: true});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          autoFocus={true}
          style={styles.inputTitle}
          placeholder="Title"
          onChangeText={(title) => this.handleTitle(title)}
          maxLength={40}
        />
        <TextInput
          autoCorrect={false}
          multiline={true}
          style={styles.inputDescription}
          placeholder="Description"
          onChangeText={(description) => this.handleDescription(description)}
          maxLength={100}
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
    height: 60,
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
