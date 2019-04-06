import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import hooker from 'react-hooker';
import withLang from '../screens/withLang';

let homeTitle = 'Map';
const Home = withLang(hooker(HomeScreen));
Home.navigationOptions = { header: null };
const HomeStack = createStackNavigator({ Home });

HomeStack.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  const params = (state.routes||[]).find(r=> r.routeName === 'Home').params;
  homeTitle = (params && params.title) || homeTitle;
  
  return {
    tabBarLabel: (params && params.title) || 'Map',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-bicycle'
        }
      />
    ),
  };
}

let linksTitle = 'Report';
const Links = withLang(hooker(LinksScreen));
Links.navigationOptions = { title: 'Report' };
const LinksStack = createStackNavigator({ Links });

LinksStack.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  const params = (state.routes||[]).find(r=> r.routeName === 'Links').params;
  linksTitle = (params && params.title) || linksTitle;

  return {
    tabBarLabel: (params && params.title) || 'Report',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
  };
};

let settingsTitle = 'Settings';
const Settings = withLang(hooker(SettingsScreen));
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
