import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface RoundedButtonProps {
  onPress: () => void
}
const RoundedButton = (props: RoundedButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={props.onPress}
      activeOpacity={0.7} 
      style={styles.touchableOpacity}>
      <Text style={styles.touchableOpacityTitle}>+</Text>
    </TouchableOpacity>
  );
}

export default RoundedButton;

const styles = StyleSheet.create({
  touchableOpacity: {
    width: 54,
    height: 54,

    marginTop: 12,

    backgroundColor: '#004a7f',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 27,

    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombras para Android
    elevation: 3,

    position: 'absolute',
    right: 12,
    bottom: 12
  },
  touchableOpacityTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'uppercase',
  }
});
