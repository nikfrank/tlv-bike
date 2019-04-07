import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { WebBrowser, MapView, Icon, Asset } from 'expo';

import hooks from './network';
import copy from './copy';

const { Marker, PolyLine } = MapView;

export default class HomeScreen extends React.Component {
  state = {
    newMarker: null,
    ready: false,
  }

  static hooks = hooks;
  
  componentDidMount(){
    this.props.navigation.addListener(
      'didFocus',
      payload => this.props.loadReports()
    );

    Asset.loadAsync([
      require('../assets/images/red-dot.png'),
      require('../assets/images/orange-dot.png'),
      require('../assets/images/green-dot.png'),
      require('../assets/images/blue-dot.png'),
    ]).then(()=> {
      setTimeout(()=> {
        
        this.setState({
          ready: true,
          dots: {
            red: require('../assets/images/red-dot.png'),
            orange: require('../assets/images/orange-dot.png'),
            green: require('../assets/images/green-dot.png'),
            blue: require('../assets/images/blue-dot.png'),
          }
        });
      }, 3000);
    });

  }
  
  longPress = (e)=>{
    if(this.state.newMarker) return;

    this.props.saveReportMarker(e.nativeEvent.coordinate);
    this.setState({ newMarker: e.nativeEvent.coordinate },
                  ()=> ToastAndroid.show(copy[this.props.lang].recordingLocation, ToastAndroid.LONG));

    setTimeout(()=> this.props.navigation.navigate('Links'), 2500);
    setTimeout(()=> this.setState({ newMarker: null }), 2500);
  }

  comingSoon = ()=>{
    ToastAndroid.show(copy[this.props.lang].directionsComingSoon, ToastAndroid.LONG)
  }
  
  render() {
    const { lang, reports=[] } = this.props;

    if(!this.state.ready) return <View/>;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={{
          position: 'absolute',
          right: 20,
          bottom: 40,
          height: 60,
          width: 60,
          borderRadius: 30,
          zIndex: 30,
          backgroundColor: 'green'
        }} onPress={this.comingSoon}>
          <Icon.Ionicons
            name='md-git-compare'
            size={26}
            style={{ marginLeft: 18, marginTop: 16, marginBottom: -3 }}
            color='white'
          />
          
        </TouchableOpacity>
        
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 32.0805,
            longitude: 34.7794,
            latitudeDelta: 0.0615,
            longitudeDelta: 0.0281,
          }}
          onLongPress={this.longPress}
        >

          {reports.map(({ latitude, longitude, type, text, color, id })=>(
            <Marker key={id}
                    coordinate={{ latitude, longitude }}
                    image={this.state.dots[color]}
                    tracksViewChanges={false}
                    title={copy[lang][type]} description={text}>
              <Image source={require('../assets/images/no-dot.png')} onLoad={()=> this.forceUpdate()}/>
            </Marker>
          ))}
          {this.state.newMarker ? (
             <Marker coordinate={this.state.newMarker}/>
          ) : null}
        </MapView>
      </View>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
