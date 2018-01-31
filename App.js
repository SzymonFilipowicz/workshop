import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';                        //importing all used components!

//importing layouts as well
import HomeScreen from './layouts/HomeScreen';
import Screen1 from './layouts/Screen1';

//importing navigator to move between multiple screens with animation
import {
  DrawerNavigator
} from 'react-navigation';

//we store here all layouts that will be used. First one is starting page
const RootDrawer = DrawerNavigator({
  Home: {
    screen: HomeScreen,             //name as imported
    navigationOptions: {
      drawerLabel: 'Home',
    }
  },
  Screen1: {
    screen: Screen1,
    navigationOptions: {
      drawerLabel: 'After home'
    }
  },
});
export default RootDrawer;

//styles we can use only in this file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
