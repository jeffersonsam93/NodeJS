/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet,Text,View,Image } from 'react-native';
import Form from './Form';
import Logo from './Logo';
type Props = {};
export default class Login extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Form type='Login'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  container2 : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
 
});
