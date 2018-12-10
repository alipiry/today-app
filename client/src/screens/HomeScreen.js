import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  onPress = () => this.props.navigation.navigate('Add');
  render() {
    return (
      <View style={styles.container}>
        <Text>
          ashfjaksfkajsj fkasjfkl'asf
        </Text>
        <Button
          title={"Add items"}
          onPress={this.onPress}
        />

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
