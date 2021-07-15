import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet,ActivityIndicator} from 'react-native';
import Intro from './app/screens/intro';
import RoundIconBtn from './app/components/RoundIconBtn';
import Notescreen from './app/screens/Notescreen';
import NoteDetails from './app/components/NoteDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Imagecomponent from './app/components/Imagecomponent';
import Noteprovider from './app/Context/Noteprovider';
import About from './app/screens/About';
const App = () => {
  const [user, setuser] = useState(undefined);
  const [photo,setphoto]=useState('')
  const[isfirsttimeopen,setisfirsttimeopen]=useState(false)
  const [appinfo,setappinfo]=useState(false)
  const finduser = async () => {
    const result = await AsyncStorage.getItem('user');
    
    {result===null?setisfirsttimeopen(true) :
      (setuser(JSON.parse(result)),
      setisfirsttimeopen(false))
    }
  };
  useEffect(() => {
    finduser();
    // AsyncStorage.clear()
  }, []);
  const IntroPage=props=><Intro {...props} onFinish={finduser} appinfo={(prop)=>setappinfo(prop)}/>
  if(appinfo)return <About appinfo={(prop)=>setappinfo(prop)}/>
  if (isfirsttimeopen) return IntroPage();
  const renderNotescreen = props => <Notescreen {...props}  isfirsttime={(text)=>setisfirsttimeopen(text)} user={user} />;

  const Stack = createStackNavigator();
  if(user===undefined){
    return <ActivityIndicator size='large' color='blue' style={{flex:1,justifyContent:'center',alignItems:'center'}}/>
  }
  return (
    <NavigationContainer>
      <Noteprovider>
        <Stack.Navigator
          screenOptions={{headerTitle: ' ', headerTransparent: true,backgrouundcolor:'black'}}>
         
          <Stack.Screen component={renderNotescreen} name="NoteScreen" />
          <Stack.Screen component={NoteDetails} name="NoteDetails" />
          <Stack.Screen component={Imagecomponent} name='imagecomponent'/>
          <Stack.Screen component={IntroPage} name='Intro'/>
          <Stack.Screen component={About} name='About'/>
        </Stack.Navigator>
      </Noteprovider>
    </NavigationContainer>
  );
};
export default App;
