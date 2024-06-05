import { Alert, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import userRegister from '@/services/userRegister';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    if (name === '' || document === ''|| email === '' || password === '') {
      Alert.alert('Please fill in all required fields!')
    } else if (document.length === 14 || document.length === 11) {
      userRegister(name, document, email, password);
      setName('');
      setDocument('');
      setEmail('');
      setPassword('');
      Alert.alert("User created successfully!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.separator} lightColor="#000" darkColor="#000" />
      <TextField 
        placeholder={"Name"} 
        value={name} 
        onChangeText={setName} />
      <TextField 
        placeholder={"CPF/CNPJ"} 
        value={document} 
        onChangeText={setDocument}
        keyboardType={'number-pad'}/>
      <TextField 
        placeholder={"E-mail"} 
        value={email} 
        onChangeText={setEmail} 
        keyboardType={'email-address'} />
      <TextField 
        placeholder={"Password"} 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry />
      <Button title='Register' onPress={() => register()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
