import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface RefreshButtonProps {
  onPress: () => void
}
const RefreshButton = (props: RefreshButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={props.onPress}
      activeOpacity={0.7} 
      style={styles.touchableOpacity}>
      <FontAwesome name="refresh" size={32} color="#004a7f" />
    </TouchableOpacity>
  );
}

export default RefreshButton;

const styles = StyleSheet.create({
  touchableOpacity: {
    width: 54,
    height: 54,

    marginTop: 12,

    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 27,
    
    position: 'absolute',
    right: 12,
    bottom: 72
  },
});
