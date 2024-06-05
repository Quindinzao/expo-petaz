import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonNoColorProps {
  title: string, onPress: () => void
}
const ButtonNoColor = (props: ButtonNoColorProps) => {
  return (
    <TouchableOpacity 
      onPress={props.onPress}
      activeOpacity={0.7} 
      style={styles.touchableOpacity}>
      <Text style={styles.touchableOpacityTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default ButtonNoColor;

const styles = StyleSheet.create({
  touchableOpacity: {
    width: '95%',
    height: 54,

    marginTop: 12,
    
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',

    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombras para Android
    elevation: 3,
  },
  touchableOpacityTitle: {
    color: '#004a7f',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
