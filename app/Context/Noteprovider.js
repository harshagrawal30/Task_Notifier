import React, {createContext, useEffect, useContext, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const NoteContext = createContext();

const Noteprovider = ({children}) => {
  const [notes, setnotes] = useState([]);
  const findnotes = async () => {
    const result = await AsyncStorage.getItem('notes');
  
    if (result !== null) setnotes(JSON.parse(result));
  };
  useEffect(() => {
    findnotes();
  }, []);

  return (
    <NoteContext.Provider value={{notes, setnotes, findnotes}}>
      {children}
    </NoteContext.Provider>
  );
};
export const useNotes = () => useContext(NoteContext);
export default Noteprovider;
