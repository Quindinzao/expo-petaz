import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

const TextField = (props: TextInputProps) => {
  return (
    <TextInput {...props} style={styles.textInput} />
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '95%',
    height: 54,

    marginTop: 12,
    paddingHorizontal: 12,

    backgroundColor: '#ffffff',
    fontSize: 16,
    fontWeight: "500",

    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombras para Android
    elevation: 3,
  }
});

export default TextField;
