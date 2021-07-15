import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import color from '../misc/color';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotes} from '../Context/Noteprovider';
import Noteinputmodel from './Noteinputmodel';
const NoteDetails = props => {
  const [note,setnote] = useState(props.route.params.note.item);
 
  const headerheight = useHeaderHeight();
  const {setnotes} = useNotes();
  const[showmodel,setshowmodel]=useState(false)
  const [isEdit,setisEdit]=useState(false)
  const [date, setDate] = useState(note.date);
  if(date){
  const [selectedDate, setselectedDate] = useState(new Date(date).getDate());}

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
 
  
  const handleupdate=async(title,desc,time,date)=>{
   const result= await AsyncStorage.getItem('notes')
   let notes=[]
   if(result!==null)notes=JSON.parse(result)
   const newnotes= notes.filter(n=>{
        if(n.id===note.id){
            n.title=title
            n.description=desc
            n.isUpdated=true
            n.time=time
            n.date=date
          
            setnote(n)
           
        }
        return n
    })
    setnotes(newnotes)
    
    await AsyncStorage.setItem('notes',JSON.stringify(newnotes))
  }
  const handleonclose=()=>{setshowmodel(false)}
  const deletenote = async () => {
  
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);
    const newnotes = notes.filter(n => n.id !== note.id);
    setnotes(newnotes);
   
    await AsyncStorage.setItem('notes', JSON.stringify(newnotes));
    props.navigation.goBack();
  };
  const openeditmodel=()=>{
      setisEdit(true)
      setshowmodel(true)
  }
  const displaydeletealert = () => {
    Alert.alert(
      'Are You Sure!',
      'This will permanently delete this Note.',
      [
        {
          text: 'Delete',
          onPress: deletenote,
          
        },
        {
          text: 'No Thanks',
     
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  const formatdate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
  };
  return (
    <SafeAreaView style={[styles.container, {paddingTop: headerheight}]}>
      <ScrollView>
        <Text style={styles.time}>{note.isUpdated?'Updated at':`Created at`} {formatdate(note.time)}</Text>

        {note.date?<Text style={{borderTopWidth:1,marginTop:4,padding:5}}>Scheduled Date:- {formatdate(note.date) + " "+days[new Date(note.date).getDay()]}</Text>:null}
        <View style={{justifyContent:'center',alignItems:'center',borderTopColor:color.DARK,borderTopWidth:1,padding:2}}>
        {new Date(note.date)<Date.now()?
        <Text style={{fontWeight:'bold',color:color.ERROR,fontSize:20}}>OVER!!!</Text>:null}
        </View>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.description}</Text>
      </ScrollView>
      <View style={styles.btncontainer}>
        <RoundIconBtn
          size={25}
          anticonname="delete"
          bg={color.ERROR}
          style={styles.deletebtn}
          onpress={displaydeletealert}
        />
        <RoundIconBtn
          size={25}
          anticonname="edit"
          onpress={openeditmodel}
        />
      </View>
      <Noteinputmodel isEdit={isEdit} note={note} visible={showmodel} onclose={handleonclose} onsubmit={handleupdate}/>
    </SafeAreaView>
  );
};

export default NoteDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 30,
    color: color.PRIMARY,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  deletebtn: {
    color: color.ERROR,
    marginBottom: 15,
  },
  btncontainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});
