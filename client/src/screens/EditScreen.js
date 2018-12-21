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

import { updateTask } from "../graphql/mutations";
import { getTasks } from "../graphql/queries";

class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit',
  };

  state = {
    title: '',
    description: '',
    titleValidation: false,
    desValidation: false
  };

  handleAlert = () => {
    Alert.alert(
      'Task Updated',
      '',
      [
        { text: 'Ok', onPress: () => this.props.navigation.goBack() , style: 'cancel' },
      ]
    );
  };

  handleAddTask = () => {
    const { mutate } = this.props;
    const { state } = this.props.navigation;

    if (this.state.titleValidation || this.state.desValidation) {
      mutate({
        variables: {
          id: state.params.id,
          title: this.state.title === '' ? state.params.title : this.state.title,
          content: this.state.description === '' ? state.params.content : this.state.description,
        },
        refetchQueries: [
          {
            query: getTasks,
          },
        ],
      }).then(() => this.handleAlert());
    } else {
      mutate({
        variables: {
          id: state.params.id,
          title: state.params.title,
          content: state.params.content,
        },
        refetchQueries: [
          {
            query: getTasks,
          },
        ],
      }).then(() => Alert.alert(
        "You didn't change anything!",
        '',
        [
          { text: 'Ok', onPress: () => this.props.navigation.goBack() , style: 'cancel' },
        ]
      ));
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
    const { state } = this.props.navigation;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          autoFocus={true}
          defaultValue={state.params.title}
          style={styles.inputTitle}
          placeholder="Title"
          onChangeText={title => this.handleTitle(title)}
          maxLength={40}
        />
        <TextInput
          autoCorrect={false}
          multiline={true}
          defaultValue={state.params.content}
          style={styles.inputDescription}
          placeholder="Description"
          onChangeText={description => this.handleDescription(description)}
          maxLength={100}

        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.handleAddTask}
        >
          <Text
            style={styles.submitButtonText}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default graphql(updateTask)(EditScreen);

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
