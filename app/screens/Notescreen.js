import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Image,
  FlatList,
  Appearance,
  Alert,
} from 'react-native';
import color from '../misc/color';
import Searchbar from '../components/seachbar';
import RoundIconBtn from '../components/RoundIconBtn';
import Noteinputmodel from '../components/Noteinputmodel';
import Note from '../components/Note';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotes} from '../Context/Noteprovider';
import Notfound from '../components/Notfound';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Notescreen = ({user, navigation, isfirsttime, photoforapp}) => {
  const [greet, setgreet] = useState('Evening');
  const [modalvisible, setmodalvisible] = useState(false);
  const {notes, setnotes, findnotes} = useNotes();
  const [searchquery, setsearchquery] = useState('');
  const [resultnotfound, setresultnotfound] = useState(false);
  const [image, setimage] = useState('');
 
  const reverseData = data => {
    return data.sort((a, b) => {
      const aint = parseInt(a.time);
      const bint = parseInt(b.time);
      if (aint < bint) return 1;
      else if (aint == bint) return 0;
      else return -1;
    });
  };
 
  useEffect(async () => {
    handleonseachinput(searchquery);
  }, [searchquery]);
  const handleonseachinputChange = text => {
    setsearchquery(text);
  };
  const handleonseachinput = async text => {
    // const Notes=await findnotes()
    // setnotes(JSON.parse(Notes))

    setsearchquery(text);
    if (!text.trim()) {
      setsearchquery('');
      setresultnotfound(false);
      return await findnotes();
    }
    const filterednotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });
    if (filterednotes.length) {
      setnotes([...filterednotes]);
    } else {
      setresultnotfound(true);
      //return setnotes(JSON.parse(findnotes()))
    }
  };
  const findgreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setgreet('Morning');
    if (hrs >= 12 && hrs < 17) return setgreet('Afternoon');
  };
  const handleonsubmit = async (title, description,date) => {
    const time = new Date().getTime();
    const note = {id: Date.now(), title, description, time,date};
    const updatednotes = [...notes, note];
    setnotes(updatednotes);
    
    await AsyncStorage.setItem('notes', JSON.stringify(updatednotes));
  };

  const handleonclear = async () => {
    setsearchquery('');
    setresultnotfound(false);
    await findnotes();
  };
  const openNote = note => {
    navigation.navigate('NoteDetails', {note});
  };
  const logoutconfirm = () => {
    AsyncStorage.clear();
    isfirsttime(true);
  };
  const logoutwarning = () => {
   
    return (
      <View>
        {Alert.alert(
          'Warning!',
          'This will Clear All Your Data including name and note details.',
          [
            {
              text: 'Yes,Log me Out',
              onPress: logoutconfirm,
            },
            {
              text: 'No',
            },
          ],
          {
            cancelable: true,
          },
        )}
      </View>
    );
  };
  const opencameralibrary = () => {
    const options = {
      title: 'Select Image',
    };
    launchImageLibrary(options, async response => {
     

      if (response.didCancel) {
        
      } else if (response.error) {
        
      } else if (response.customButton) {
       
        alert(response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
       
        await AsyncStorage.setItem('photo', JSON.stringify(source.uri));
        setimage(source.uri);
      }
    });
  };
  const removephoto = async () => {
    await AsyncStorage.setItem('photo', '');
    setimage('');
  };
  const doremovephoto = () => {
    Alert.alert(
      'Remove Photo',
      'Are you sure to remove your photo',
      [
        {
          text: 'Yes',
          onPress: removephoto,
        },
        {
          text: 'No',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  const photooptionmenu = () => {
    Alert.alert(
      'Select',
      'What you want to do!',
      [
        {
          text: 'Change Photo',
          onPress: opencameralibrary,
        },
        {
          text: 'Remove Photo',
          onPress: doremovephoto,
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  const imagecomponent = () => {
   // photoforapp(image);
    navigation.navigate('imagecomponent');
  };
  useEffect(async () => {
    const photo = await AsyncStorage.getItem('photo');
    {
      photo ? setimage(JSON.parse(photo)) : null;
    }
 
    findgreet();
  }, []);
  const reversenotes = reverseData(notes);
  
  return (
    <>
      <StatusBar barStyle="default" backgroundColor={color.PRIMARY} />
      <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              zIndex: 13,
              marginTop: 5,
              padding:10,
            
            }}>
            <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>

            <TouchableOpacity
              onPress={()=>imagecomponent()}
              onLongPress={photooptionmenu}
              style={styles.photo}>
              {image ? (
                <Image
                  source={{uri: image}}
                   style={styles.photoo}
                  height={45}
                  width={45}
                />
              ) : (
                <RoundIconBtn
                  anticonname="user"
                  onpress={opencameralibrary}
                  style={styles.photoo}
                  size={20}
                />
              )}
            </TouchableOpacity>
           </View>
       <View style={styles.container}>
          
          {notes.length !== 0 ? (
            <Searchbar
              value={searchquery}
              onchangetext={handleonseachinputChange}
              containerstyle={{marginVertical: 15, color: 'black'}}

              onclear={handleonclear}
            />
          ) : null}
          {resultnotfound ? (
            <Notfound />
          ) : (
            
            <TouchableWithoutFeedback style={{zIndex: 11}}>
              <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
                data={reversenotes}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                keyExtractor={note => note.id.toString()}
                renderItem={item => (
                  <Note item={item} onPress={() => openNote(item)} />
                )}
                style={styles.flatlist}
              />
            </TouchableWithoutFeedback>
           
          )}
          <TouchableOpacity style={styles.logout}>
            <RoundIconBtn
              bg={color.ERROR}
              anticonname="logout"
              size={24}
              onpress={logoutwarning}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addbtn}>
            <RoundIconBtn
              colr={color.PRIMARY}
              bg={color.LIGHT}
              anticonname="plus"
              onpress={()=>setmodalvisible(true)}

            />
          </TouchableOpacity>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              styles.emptyheadercontainer,
            ]}>
            {notes.length !== 0 ? null : (
              <Text style={styles.emptyheader}>Add Notes</Text>
            )}
           
          </View>
         </View>
    
      <Noteinputmodel
        visible={modalvisible}
        onclose={() => setmodalvisible(false)}
        onsubmit={handleonsubmit}
      />
    </>
  );
};

export default Notescreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: -2,
    marginTop:-15,
    
  },
  emptyheader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.3,

    zIndex: -1,
  },
  emptyheadercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

    zIndex: 1,
  },
  addbtn: {
    position: 'absolute',
    right: 20,
    zIndex: 31,
    bottom: 40,
  },
  flatlist: {
    color: 'blue',
    zIndex:22,
    marginTop:5
  },
  logout: {
    position: 'absolute',
    right: 30,
    bottom: 140,
    justifyContent: 'center',
    zIndex: 31,
  },
  photo: {
    zIndex: 14,
    height:49,
    width:53,

    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  photoo: {
    borderRadius: 50,
    zIndex: 15,
  },
});
