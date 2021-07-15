import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text,Image,Dimensions } from 'react-native'

const Imagecomponent = (props) => {
    const[image,setimage]=useState(null)
    const width=Dimensions.get('window').width
    const height=Dimensions.get('window').height
    useEffect(async()=>{
    const result=await AsyncStorage.getItem('photo')
    setimage(JSON.parse(result))
    },[])
  
    return (
      
        <View>
     
          <Image source={{uri:image}} height={height*0.6} width={width} style={{zIndex:13,justifyContent:'center',alignItems:'center',marginTop:height/7}}/>
        </View>
    )
}

export default Imagecomponent
