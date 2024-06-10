// External libraries
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import ButtonNoColor from '@/components/ButtonNoColor';

// Services
import petRegister from '@/services/petRegister';
import serviceRegister from '@/services/serviceRegister';

// Interfaces
import { UserProps } from '@/interfaces/UserProps';

export default function RegisterScreen() {

  const [nameOrTitle, setNameOrTitle] = useState('');
  const [speciesOrDescription, setSpeciesOrDescription] = useState('');
  const [userData, setUserData] = useState<UserProps>();
  const [error, setError] = useState('');

  const clearStates = () => {
    setNameOrTitle('');
    setSpeciesOrDescription('');
  }

  const registerPetOrService = async () => {
    if (userData?.document.length === 14) {
      await serviceRegister(nameOrTitle, speciesOrDescription, userData)
        .then(() => {
          clearStates();
        })
        .catch(error => {
          setError(error.message);
        });
    } else if (userData?.document.length === 11) {
      await petRegister(nameOrTitle, speciesOrDescription, userData)
        .then(() => {
          clearStates();
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }

  const getUserData = async () => {
    const jsonValue = await AsyncStorage.getItem('@AuthPetAZ');
    const jsonValueFormatted = jsonValue != null ? JSON.parse(jsonValue) : null;
    setUserData(jsonValueFormatted);
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{userData?.document.length === 14 ? "Register Service" : "Register Pet"}</Text>
      <View style={styles.separator} lightColor="#000" darkColor="#000" />
      <TextField 
        placeholder={userData?.document.length === 14 ? "Title" : "Name"} 
        value={nameOrTitle} 
        onChangeText={setNameOrTitle} />
      <TextField 
        placeholder={userData?.document.length === 14 ? "Description" : "Species"} 
        value={speciesOrDescription} 
        onChangeText={setSpeciesOrDescription} />
      <Button title='Register' onPress={registerPetOrService} />
      <ButtonNoColor title='Back' onPress={() => router.back()} />
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
