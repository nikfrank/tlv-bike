import React, { Component } from 'react';

let currentLang = 'en';
const listeners = {};

export default P=> class WithLang extends Component {
  state = { lang: currentLang }
  
  componentDidMount(){
    this.i = Math.random();
    listeners[this.i] = (lang)=> this.setState({ lang });
  }

  componentWillUnmount(){
    delete listeners[this.i];
  }

  setLang = lang => (
    currentLang = lang,
    Object.keys(listeners).forEach(i=> listeners[i](lang))
  )
  
  render(){
    return (<P {...this.props} lang={this.state.lang} setLang={this.setLang}/>);
  }
};

export const addListener = (i, f)=> listeners[i] = f;
export const removeListener = i=> delete listeners[i];
