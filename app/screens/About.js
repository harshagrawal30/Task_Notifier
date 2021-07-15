import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text,StyleSheet,BackHandler,Appearance } from 'react-native'
import {Icon} from 'react-native-elements'
import color  from '../misc/color'
import { ScrollView } from 'react-native-gesture-handler'
const About = ({appinfo}) => {
    const devicetheme=Appearance.getColorScheme()
    let bgcolor='white'
    if(devicetheme=='light')bgcolor='black'
   
   
    return (
        <>
        
         <TouchableOpacity style={styles.gobackcontainer} onPress={()=>appinfo(false)}>
            <Icon
        name='leftcircle'
        type="antdesign"
        size={25}
        color={bgcolor}
         />
         
         <Text style={{fontSize:20,marginLeft:5,color:bgcolor}}>Go Back</Text>
         </TouchableOpacity>
       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            
            <Text style={{fontSize:19,color:bgcolor}}>
        <Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>App Notifier</Text> is an offline app for saving your work plans and being notified.
        {'\n\n'}<Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>Below are some features of the App.{'\n'}</Text>
        <Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>{'\n'}1. Easy Login:{'\n'}</Text>
        You just need to enter your name to start.{'\n'}
        <Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>{'\n'}2.Image Adding{'\n'}</Text>
        App also has a image column at top right of Screen. Default image of dummy person is present.Press on it to upload an image.{'\n'}
        <Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>{'\n'}3.Changing and Removing Image{'\n'}</Text>
        App has also given you option to change and remove image. To do so,Just Press image for some time to have option of changing or removing it.{'\n'}
        <Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>{'\n'}4.Adding Task{'\n'}</Text>
        Add button at bottom right corner makes you to add Tasks.{'\n'}
        <Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>{'\n'}5. Scheduling Tasks and Get Notified{'\n'}</Text>
        Task Scheduling is a great way to way to never miss your task which is possible as you get notification about your task not a single time but Twice.  
        <Text style={{fontWeight:'bold',fontSize:18}}>Before 10 mins of your task and At start of Task.{'\n'}</Text>
        <Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>{'\n'}6.Easy Editing{'\n'}</Text>
        You can easily edit your task on pressing edit button present at bottom corner of detail page of the task{'\n'}
        <Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>{'\n'}7.Deleting Task{'\n'}</Text>
        To delete Task just click on delete button present above edit button of detail page of the task.{'\n'}
        <Text style={{fontWeight:'bold',fontSize:20,color:bgcolor}}>{'\n'}8. Logout {'\n'}</Text>
        There is a logout button above add button. Once logged out,Your all tasks and details will get cleared.{'\n'}
       
         </Text>
        
           
        </ScrollView>
       
        </>
    )
}

export default About

const styles=StyleSheet.create({
container:{
    display:'flex',
    flex:1,
    marginTop:60,
    paddingHorizontal:10
},
gobackcontainer:{
    position:'absolute',
    top:10,
    display:'flex',
    flexDirection:'row',
    padding:10,

}
})