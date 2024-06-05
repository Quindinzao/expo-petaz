import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import authService from '@/services/authService';
import ButtonNoColor from '@/components/ButtonNoColor';
import { router } from 'expo-router';
import api from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authentication = () => {
    api.post('/users/auth', { email: email, password: password })
      .then(response => {
        AsyncStorage.setItem('@AuthPetAZ', JSON.stringify(response.data));
        router.replace('/(tabs)/home');
      })
      .catch(error => {
        
      });
  }

  const goToRegister = async () => {
    router.push('/register');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.separator} lightColor="#000" darkColor="#000" />
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
      <Button title='Sign In' onPress={authentication} />
      <ButtonNoColor title='Register' onPress={goToRegister} />
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
