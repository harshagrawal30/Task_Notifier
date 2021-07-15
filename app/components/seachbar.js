import React from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import color from '../misc/color';
import {Icon} from 'react-native-elements';
const Searchbar = ({containerstyle,value,onchangetext,onclear}) => {
  
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.searchbar, {...containerstyle}]}
        placeholder="Search here.."
        placeholderTextColor={color.PRIMARY}
        value={value}
        onChangeText={onchangetext}
      />
      {value? <TouchableOpacity  style={styles.clear} onPress={onclear}>
  <Icon
    name='close'
    type="antdesign"
    size={ 25}
    color={'red'}
  
   
  />
</TouchableOpacity>:null}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchbar: {
    borderWidth: 0.5,
    borderColor: color.PRIMARY,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
    zIndex: 3,
    color: color.PRIMARY,
  },
  clear:{
    position:'absolute',
    right:20,
   
    zIndex:11,
  },
  container:{
    justifyContent:'center'
  }
});
