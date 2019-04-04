import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import hooks from './network';

export default class LinksScreen extends React.Component {
  static hooks = hooks;

  state = {
    val: ''
  }

  componentDidMount(){
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.loadReportMarker()
            .then(()=> this.setState(this.props.reportMarker) );
      }
    );
  }


  setVal = (val)=>{
    this.setState({ val });
  }

  submit = ()=>{
    this.props.createReport({
      ...this.state,
      color: 'red',
      id: Math.random(),
    });
    this.setState({ latitude: null, longitude: null, val: ''});
    ToastAndroid.show('Saving report...', ToastAndroid.LONG)
  }
  
  render() {
    const { val, latitude, longitude } = this.state;
    
    return (
      <ScrollView style={styles.container}>
        <TextInput
          onChangeText={this.setVal}
          value={val}
          style={styles.root}
        />

        <TextInput
          value={latitude ? (''+latitude) : 'Latitude'}
          style={styles.root}
        />

        <TextInput
          value={longitude ? (''+longitude) : 'Longitude'}
          style={styles.root}
        />
        <Button onPress={this.submit}
                title='Done!'/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },

  root: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    padding: 10,
  }
});
