import React from 'react';
import {
  Button,
  StyleSheet,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  },
});

const fetchLocation=props=>{
  return(
    <View style={styles.container}>
      <Button title='Get Location' onPress={props.onGetLocation}></Button>
    </View>
  );
}

export default fetchLocation;




