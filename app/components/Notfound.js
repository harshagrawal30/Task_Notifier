import React from 'react'
import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements';
const Notfound = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject,styles.container]}>
           <TouchableOpacity  style={styles.clear} >
  <Icon
    name='frowno'
    type="antdesign"
    size={ 50}
    color={'black'}
  

  />
</TouchableOpacity>
<Text style={{marginTop:20,fontSize:20}}>Result Not Found</Text>
        </View>
    )
}

export default Notfound

const styles=StyleSheet.create({
    container:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
   opacity:0.5,
   zIndex:-1
    },
    

})