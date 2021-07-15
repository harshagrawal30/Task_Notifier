import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import color from '../misc/color';
import {Icon} from 'react-native-elements';
const RoundIconBtn = ({anticonname, size, colr, style, onpress,bg}) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <Icon
        name={anticonname}
        type="antdesign"
        size={size || 40}
        color={colr || color.LIGHT}
        backgroundColor={bg||color.PRIMARY}
        style={[{...style},styles.iconn]}
      />
    </TouchableOpacity>
  );
};

export default RoundIconBtn;

const styles = StyleSheet.create({
  iconn: {
  //  backgroundColor: color.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});
