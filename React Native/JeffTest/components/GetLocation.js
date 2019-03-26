import React from 'react';
import {  StyleSheet,Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

export default class GetLocation extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  getUserLocation=()=>{
    console.log('Clicked');
    navigator.geolocation.getCurrentPosition(position=>{
      console.log('Clicked');
      console.log(position);
    },err=>{console.log(err)},{timeout:5000})
  }
  render() {
    return <HomeScreen onGetLocation={this.getUserLocation}/>;
  }
}

