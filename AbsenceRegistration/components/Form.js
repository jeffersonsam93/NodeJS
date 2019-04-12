/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {  StyleSheet,Text,View,TextInput,TouchableOpacity  } from 'react-native';
import {tryLogin} from '../Api/Api'
type Props = {};
export default class Form extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:''
         };
      }
      onPress = () => {
        tryLogin(this.state.username,this.state.password).then((response)=>{
            this.setState({username:response.employeename})
        }).catch((err)=>{
            this.setState({err})
        })
      }
    render() {
        return (
            <View style={styles.container}>
            <TextInput style={styles.input} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Username"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.username}
                onChangeText={(text) => this.setState({username:text})}
                onSubmitEditing={()=> this.password.focus()}
                />
            <TextInput style={styles.input} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#ffffff"
                value={this.state.password}
                onChangeText={(text) => this.setState({password:text})}
                ref={(input) => this.password = input}
                />  
            <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={styles.buttonText}>{this.props.type}</Text>
            </TouchableOpacity>     
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  input: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});
