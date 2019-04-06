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
    type: 'crash',
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
      type: this.state.reportType,
      text: this.state.text || '',
      color: this.state.severity,
      id: Math.random(),
    });
    this.setState({ latitude: null, longitude: null, text: '', type: 'crash', severity: 'red', });
    ToastAndroid.show(copy[this.props.lang].savingReport, ToastAndroid.LONG)
  }
  
  render() {
    const { text, latitude, longitude, reportType, severity } = this.state;
    const { lang } = this.props;

    return (
      <ScrollView style={styles.container}>
        
        {latitude ? [
           <Text key='lat-label'>{copy[lang].latitude} (°{latitude > 0 ? 'N' : 'S'})</Text>,
           <TextInput
             key='latitude'
             value={(''+latitude)}
             style={styles.textInput}
           />,

           <Text key='lng-label'>{copy[lang].longitude} (°{longitude > 0 ? 'E' : 'W'})</Text>,
           <TextInput
             key='longitude'
             value={(''+longitude)}
             style={styles.textInput}
           />
        ] : (
           <View>
             <Text style={styles.locText}>
               {copy[lang].toSelectLocation}
             </Text>
             <Text style={styles.locText}>
               {copy[lang].pressAndHold}
             </Text>
           </View>
        )}

        <Text style={styles.reportTypeLabel}>
          {copy[lang].reportType}
        </Text>
        <Picker
          selectedValue={reportType}
          style={{height: 50}}
          onValueChange={this.setReportType}>
          <Picker.Item label={copy[lang].crash} value="crash" />
          <Picker.Item label={copy[lang].animalInLane} value="animalInLane" />
          <Picker.Item label={copy[lang].safetyEvent} value="safetyEvent" />
        </Picker>

        
        <Text style={styles.reportTypeLabel}>
          {copy[lang].severity}
        </Text>
        <Picker
          selectedValue={severity}
          style={{height: 50}}
          onValueChange={this.setSeverity}>
          <Picker.Item label={copy[lang].critical+' ('+copy[lang].red+')'} value="red" />
          <Picker.Item label={copy[lang].serious+' ('+copy[lang].orange+')'} value="orange" />
          <Picker.Item label={copy[lang].moderate+' ('+copy[lang].blue+')'} value="blue" />
          <Picker.Item label={copy[lang].benign+' ('+copy[lang].green+')'} value="green" />
        </Picker>

        <Text>
          {copy[lang].description}
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
                title={copy[lang].done}/>
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
