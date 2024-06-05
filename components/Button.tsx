import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string, onPress: () => void
}
const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={props.onPress}
      activeOpacity={0.7} 
      style={styles.touchableOpacity}>
      <Text style={styles.touchableOpacityTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  touchableOpacity: {
    width: '95%',
    height: 54,

    marginTop: 12,
    
    backgroundColor: '#004a7f',
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
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
