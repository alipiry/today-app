import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

export default class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Edit
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
