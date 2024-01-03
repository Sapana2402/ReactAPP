import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import COLORS from '../../Utils/colors';

const CustomeButton = ({onPress, tiitle, style}) => {
  return (
    <TouchableOpacity style={[{...style}, styles.button]} onPress={onPress}>
      <Text style={styles.text}>{tiitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.lightBrown,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 15,
    // paddingVertical: 2,
  },
});
export default CustomeButton;
