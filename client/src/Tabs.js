import React from 'react';
import {
  createBottomTabNavigator
} from 'react-navigation';
import  Icon  from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import MoreScreen from './screens/MoreScreen';

export default createBottomTabNavigator(
  {
    Add: AddScreen,
    Home: HomeScreen,
    More: MoreScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({tintColor}) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'Add') {
          iconName = 'md-add';
        } else if (routeName === 'More') {
          iconName = 'ios-list';
        }
        return (
          <Icon
            name={iconName}
            size={30}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#007AFF',
      inactiveTintColor: 'gray',
      // showLabel: false, /* disable tab title */
    },
    initialRouteName: 'Home',
  }
);
