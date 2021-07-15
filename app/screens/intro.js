import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  Dimensions,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import color from '../misc/color';
import RoundIconBtn from '../components/RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';
const Intro = ({onFinish,appinfo}) => {
  const devicetheme=Appearance.getColorScheme()
    let bgcolor='white'
    if(devicetheme=='light')bgcolor='black'
  const [name, setname] = useState('');
  const handleonchangewtext = text => {
    setname(text);
  };
  const handlesubmit = async () => {
    const user = {name: name};

    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.inputtitle}>Enter Your Name to Continue</Text>
      <TextInput
        value={name}
        onChangeText={handleonchangewtext}
        placeholder="Enter Your Name Here"
        style={styles.textinput}
      />
      {name.length > 0 ? (
        <RoundIconBtn anticonname="arrowright" onpress={handlesubmit} />
      ) : null}
      <View style={styles.infocontainer}>
      <Text style={{fontSize:17,color:bgcolor,padding:12}}>Before getting Started, Just Have a look about the app below.</Text>
      <TouchableOpacity  style={styles.info} onPress={()=>appinfo(true)}>
      <Text style={{color:color.PRIMARY,fontSize:20}}>About App</Text>
      <Text style={{padding:3}}>
      <Icon
        name='info'
        type="antdesignfilled"
        size={25}
        color={color.PRIMARY}
         /> </Text></TouchableOpacity>
         </View>
    </View>
  );
};

export default Intro;
const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  textinput: {
    borderWidth: 2,
    borderColor: color.PRIMARY,
    color: color.PRIMARY,
    width: width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 20,
    marginBottom: 15,
  },
  inputtitle: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
    color:color.PRIMARY,
    fontSize:24,
    fontWeight:'bold',
  },
  info:{
    
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'

  },
  infocontainer:{
    display:'flex',
    flexDirection:'column',
    position:'absolute',
    bottom:30,
  }
});
