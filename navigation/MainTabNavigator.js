import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import hooker from 'react-hooker';


const Home = hooker(HomeScreen);
Home.navigationOptions = { header: null };
const HomeStack = createStackNavigator({ Home });

HomeStack.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  const params = (state.routes||[]).find(r=> r.routeName === 'Home').params;

  return {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
        }
      />
    ),
  };
}

const Links = hooker(LinksScreen);
Links.navigationOptions = { title: 'Report' };
const LinksStack = createStackNavigator({ Links });

LinksStack.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  const params = (state.routes||[]).find(r=> r.routeName === 'Links').params;

  return {
    tabBarLabel: 'Report',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
  };
};

let settingsTitle = 'Settings';
const Settings = hooker(SettingsScreen);
Settings.navigationOptions = ({ navigation })=>{
  return {
    title: settingsTitle,
  }
};

const SettingsStack = createStackNavigator({
  Settings,
});

SettingsStack.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  const params = (state.routes||[]).find(r=> r.routeName === 'Settings').params;
  settingsTitle = (params && params.title) || settingsTitle;
  
  return {
    tabBarLabel: (params && params.title) || 'Settings',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
      />
    ),
  }
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
