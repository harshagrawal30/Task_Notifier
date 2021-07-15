import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StatusBar,
  TextInput,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  BackHandler,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  Switch,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import RoundIconBtn from './RoundIconBtn';
import color from '../misc/color';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import { Icon } from 'react-native-elements';
import { random } from 'lodash';


const Noteinputmodel = ({note, isEdit, visible, onclose, onsubmit}) => {

  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showdatepicker, setshowdatepicker] = useState(false);
  const [selectedDate, setselectedDate] = useState('');
  const [selectedmonth, setselectedmonth] = useState('');
  const [selectedyear, setselectedyear] = useState('');
  const [selectedhour, setselectedhour] = useState('');
  const [selectedmin, setselectedmin] = useState('');
  const [selectedday,setselectedday]=useState('')
  const [selectedtime,setselectedtime]=useState('')
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const Screenwidth = Dimensions.get('screen').width;
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    {
      isEnabled
        ? setshowdatepicker(false) +
          setselectedmin('') +
          setselectedDate('') +
          setselectedmonth('') +
          setselectedyear('') +
          setselectedhour('')+
          setselectedtime('')+
          setselectedday('')
        : setshowdatepicker(true);
    }
  };

  PushNotification.configure({
    onNotification: function (notification) {
      //console.log("n",notification)
     
    },
    requestPermissions: Platform.OS === 'ios'
  })

  const createchannel=()=>{
    PushNotification.createChannel({
      channelId:'test-channel',
      channelName:'test channel'
    })
  }

  const handlenotification=(title,desc,date)=>{
    
    PushNotification.localNotificationSchedule({
      channelId:'test-channel',
    title:title,
    message:'Start your task now',
    bigText:desc,
    
    date:new Date(date),
    allowWhileIdle:true,
    })
    }

    const handlenotifications=(title,desc,date)=>{
      PushNotification.localNotificationSchedule({
        channelId:'test-channel',
      title:title,
      message:'Task to get Start in 10 min',
      bigText:`You have a task at ${new Date(date).getHours()}:${new Date(date).getMinutes()}`,
      
      date:new Date(date- 600*1000),
      allowWhileIdle:true,
      })

    }
  
  
  useEffect(() => {
    
  
    createchannel()
    if (isEdit) {
      settitle(note.title);
      setdesc(note.description);
    }
  }, [isEdit]);
  const handlemodalclose = () => {
    Keyboard.dismiss();
  };
  const handleonchangetext = (text, valuefor) => {
    if (valuefor === 'title') settitle(text);
    if (valuefor === 'desc') setdesc(text);
  };
  const handlesubmit = () => {
    if (!title.trim() || !desc.trim()) return onclose();
    if (isEdit) {
      if(selectedDate){
        onsubmit(title,desc,Date.now(),date)
        handlenotifications(title,desc,date)
        handlenotification(title,desc,date)
      }
      else onsubmit(title, desc,Date.now());
      settitle('');
      setdesc('');
      setselectedmin('') 
      setselectedDate('') 
      setselectedmonth('')
      setselectedyear('') 
      setselectedhour('')
      setselectedtime('')
      setselectedday('')
    } else {
       if(selectedDate){
         onsubmit(title,desc,date)
         handlenotifications(title,desc,date)
         handlenotification(title,desc,date)
       }
      else onsubmit(title, desc);
      settitle('');
      setdesc('');
      setselectedmin('') 
      setselectedDate('') 
      setselectedmonth('')
      setselectedyear('') 
      setselectedhour('')
      setselectedtime('')
      setselectedday('')
    }

    onclose();
  };
  const closemodal = () => {
    if (isEdit) {
    } else {
      settitle('');
      setdesc('');
    }
    onclose();
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    const selecteddate = new Date(currentDate);
    setDate(currentDate);
  
    setselectedDate(selecteddate.getDate());
    setselectedmonth(selecteddate.getMonth());
    setselectedyear(selecteddate.getFullYear());
    setselectedhour(selecteddate.getHours());
    setselectedmin(selecteddate.getMinutes());
    setselectedday(selecteddate.getDay())
    setselectedtime(selecteddate.getTime())

  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <>
      <StatusBar />
      
      <Modal visible={visible} animationType="slide">
      <TouchableOpacity style={styles.gobackcontainer} onPress={()=>closemodal()}>
            <Icon
        name='leftcircle'
        type="antdesign"
        size={25}
        color={color.PRIMARY}
         />
         
         <Text style={{fontSize:20,marginLeft:5,color:color.PRIMARY}}>Go Back</Text>
         </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.header}>Enter Your Task Here</Text>
          <TextInput
            placeholder="Title"
            placeholderTextColor={color.PRIMARY}
            value={title}
            onChangeText={text => handleonchangetext(text, 'title')}
            style={[styles.input, styles.title]}
          />
          <TextInput
            multiline
            placeholder="Enter Task Here"
            placeholderTextColor={color.PRIMARY}
            value={desc}
            onChangeText={text => handleonchangetext(text, 'desc')}
            style={[styles.input, styles.description]}
          />
          <View style={styles.btncontainer}>
            {title.trim() && desc.trim() ? (
              <RoundIconBtn
                anticonname="check"
                size={45}
                style={styles.submit}
                onpress={handlesubmit}
              />
            ) : null}
            <RoundIconBtn
              anticonname="close"
              size={45}
              style={{marginLeft: 15}}
              onpress={closemodal}
            />
          </View>
          <View><Text  style={{fontWeight:'bold',fontSize:16}}>
            Press Below icon to Schedule your Task and get Notified.
            </Text>
            
            </View>
          <View style={{flex:1/3,flexDirection:'column',justifyContent:'space-between',marginTop:10}}>

            <Switch
              trackColor={{false: '#767577', true: color.DARK}}
              thumbColor={isEnabled ? color.PRIMARY : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              
              style={{right:Screenwidth* 3/4}}
            />

            {showdatepicker ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: Screenwidth / 2 - 30}}>
                  <Button  color={color.PRIMARY} onPress={showDatepicker} title="select Date" />
                </View>
                <View style={{width: Screenwidth / 2 - 30}}>
                  <Button color={color.PRIMARY} onPress={showTimepicker} title="Select Time" />
                </View>
              </View>
            ) : null}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                minimumDate={new Date()}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <KeyboardAvoidingView contentContainerStyle={styles.kav}>
          <View style={{marginTop:15,justifyContent:'center',alignItems:'center'}}>
          {selectedDate ? (
            <Text style={{fontWeight: 'bold',fontSize:15}}>
              Scheduling Task at: {selectedDate}/{selectedmonth + 1}/
              {selectedyear} {days[selectedday]} {selectedhour} hr {selectedmin} min
            </Text>
          ) : <Text style={{fontSize:15}}>Task is not Scheduled. Schedule it now!!</Text>}
          </View>
          </KeyboardAvoidingView>
          </View>
        
       
        <TouchableWithoutFeedback onPress={handlemodalclose}>
          <View style={[styles.modelBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default Noteinputmodel;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: color.PRIMARY,
    color: color.DARK,
    fontSize: 20,
  
  },
  title: {
    marginTop:10,
    height: 60,
    marginBottom: 55,
    fontWeight: 'bold',
    color: color.PRIMARY,
    
  },
  description: {
    height: 80,
    paddingTop: 15,
    color: color.PRIMARY,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: color.LIGHT,
  },
  modelBG: {
    flex: 1,
    zIndex: -1,
    backgroundColor: color.DARK,
  },
  submit: {},
  btncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.PRIMARY,
    marginTop:10

  },
  kav:{
    
  },
  gobackcontainer:{
   display:'flex',
    flexDirection:'row',
    padding:10,
    
    backgroundColor: color.LIGHT,
}
});
