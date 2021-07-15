import React from 'react';
import {View, Text, StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import color from '../misc/color';
import {Icon} from 'react-native-elements';
const width=Dimensions.get('window').width-40
const Note = ({item,onPress}) => {
    
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {item.item.date?
      (new Date(item.item.date)> Date.now()?
      <View style={{display:'flex',flexDirection:'row' ,justifyContent:'space-between'}}>
      <Text style={styles.title} numberOfLines={2}>{item.item.title}</Text>
      <Icon
        name='clockcircle'
        type="antdesign"
        size={20}
        color={ color.LIGHT}
       
        
      /></View>
      :
      <View style={{display:'flex',flexDirection:'row' ,justifyContent:'space-between'}}>
      <Text style={styles.title} numberOfLines={2}>{item.item.title}</Text>
      <Icon
        name='clockcircle'
        type="antdesign"
        size={20}
        color={ color.ERROR}
       
        
      /></View>)
      : <Text style={styles.title} numberOfLines={2}>{item.item.title}</Text>
      }
      <Text numberOfLines={3} style={styles.description}>{item.item.description}</Text>
    </TouchableOpacity>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.PRIMARY,
    width:width/2 - 10,
    padding:8,
    borderRadius:10,
    marginBottom:15,
    zIndex:1,
    minHeight:80
  },
  title:{
      fontWeight:'bold',
      fontSize:16,
      color:color.LIGHT,
      paddingBottom:10
  },
  description:{
    color:color.DARK
  }
});
