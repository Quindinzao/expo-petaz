import { Alert, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import userRegister from '@/services/userRegister';
import ButtonNoColor from '@/components/ButtonNoColor';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = () => {
    userRegister(name, document, email, password)
      .then(() => {
        setName('');
        setDocument('');
        setEmail('');
        setPassword('');
        setError('');
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const goToLogin = () => {
    router.replace('/');
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
      <Button title='Register' onPress={register} />
      <ButtonNoColor title='Login' onPress={goToLogin} />
      <Text style={styles.error}>{error}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#6f0404',
    fontWeight: '500'
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
