import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Details'
  };

  render() {
    const { state } = this.props.navigation;

    return (
      <View
        style={styles.container}
      >
        <Text>
          Title: {state.params.title}
        </Text>
        <Text>
          Content: {state.params.content}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
