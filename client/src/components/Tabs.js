import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import HomeScreen from "../screens/HomeScreen";
import AddScreen from "../screens/AddScreen";
import EditScreen from "../screens/EditScreen";
import DetailScreen from "../screens/DetailScreen";

export default createAppContainer(createStackNavigator(
  {
    Add: {
      screen: AddScreen
    },
    Home: {
      screen: HomeScreen
    },
    Edit: {
      screen: EditScreen
    },
    Detail: {
      screen: DetailScreen
    }
  },
  {
    initialRouteName: "Home"
  }
));
