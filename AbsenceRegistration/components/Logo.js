/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet,View,Image } from 'react-native';
type Props = {};
export default class Logo extends Component<Props> {
  render() {
    return (
   
      <View style={styles.container}>
				<Image   
          			source={require('../images/eagle_logo_new.png')}/>
  			</View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
 
});
