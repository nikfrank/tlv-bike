import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
  View,
  Text,
  Picker,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import hooks from './network';
import copy from './copy';

export default class LinksScreen extends React.Component {
  static hooks = hooks;

  state = {
    text: '',
    severity: 'red',
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


  setText = (text)=> this.setState({ text })

  setReportType = (reportType) => this.setState({ reportType })
  setSeverity = (severity) => this.setState({ severity })

  submit = ()=>{
    this.props.createReport({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      type: this.state.reportType || 'Crash',
      text: this.state.text || '',
      color: this.state.severity || 'red',
      id: Math.random(),
    });
    this.setState({ latitude: null, longitude: null, text: ''});
    ToastAndroid.show('Saving report...', ToastAndroid.LONG)
  }
  
  render() {
    const { text, latitude, longitude, reportType, severity } = this.state;
    
    return (
      <ScrollView style={styles.container}>
        
        {latitude ? [
           <Text key='lat-label'>Latitude (°{latitude > 0 ? 'N' : 'S'})</Text>,
           <TextInput
             key='latitude'
             value={latitude ? (''+latitude) : 'Latitude'}
             style={styles.textInput}
           />,

           <Text key='lng-label'>Longitude (°{longitude > 0 ? 'E' : 'W'})</Text>,
           <TextInput
             key='longitude'
             value={longitude ? (''+longitude) : 'Longitude'}
             style={styles.textInput}
           />
        ] : (
           <View>
             <Text style={styles.locText}>
               To select location, return to map 
             </Text>
             <Text style={styles.locText}>
               Press and hold map to drop pin
             </Text>
           </View>
        )}

        <Text style={styles.reportTypeLabel}>
          Report Type:
        </Text>
        <Picker
          selectedValue={reportType}
          style={{height: 50}}
          onValueChange={this.setReportType}>
          <Picker.Item label="Crash" value="Crash" />
          <Picker.Item label="Animal in Lane" value="Animal in Lane" />
          <Picker.Item label="Safety Event" value="Safety Event" />
        </Picker>

        
        <Text style={styles.reportTypeLabel}>
          Severity:
        </Text>
        <Picker
          selectedValue={severity}
          style={{height: 50}}
          onValueChange={this.setSeverity}>
          <Picker.Item label="Serious (red)" value="red" />
          <Picker.Item label="Moderate (orange)" value="orange" />
          <Picker.Item label="Needs Attention (blue)" value="blue" />
          <Picker.Item label="Benign (green)" value="green" />
        </Picker>

        <Text>
          Description (free text)
        </Text>
        <TextInput
          onChangeText={this.setText}
          value={text}
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
        />
        
        <Button onPress={this.submit}
                disabled={!latitude}
                style={styles.submitButton}
                title='Done!'/>
        <View style={{ height: 1000 }}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },

  locText: {
    padding: 5,
    fontSize: 14,
    backgroundColor: '#8f88',
    borderRadius: 4,
  },

  reportTypeLabel: {
    marginTop: 12,
  },
  
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },

  submitButton: {
    marginTop: 20,
  },
});
