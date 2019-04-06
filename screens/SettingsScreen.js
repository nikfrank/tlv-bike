import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Picker, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

import copy from './copy';

export default class SettingsScreen extends React.Component {

  state = { lang: this.props.lang }

  setLang = lang => this.setState({ lang }, ()=> {
    this.props.setLang(lang);
    this.props.navigation.setParams({ title: copy[lang].Settings })
    
    this.props.navigation.dispatch(NavigationActions.setParams({
      params: { title: copy[lang].Links },
      key: this.props.navigation.state.key.slice(0,-1)+'1',
    }));
    
    this.props.navigation.dispatch(NavigationActions.setParams({
      params: { title: copy[lang].Home },
      key: this.props.navigation.state.key.slice(0,-1)+'0',
    }));
  })

  render() {
    const { lang } = this.state;
    
    return [
      <View key='form'>
        <Text style={{ color: '#cccc', padding: 3 }}>{copy[lang].language}</Text>
        <Picker
          selectedValue={lang}
          style={{height: 50}}
          onValueChange={this.setLang}>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Français" value="fr" />
          <Picker.Item label="עברית" value="he" />
        </Picker>
      </View>,
      
      <ExpoConfigView key='about' />
    ];
  }
}
