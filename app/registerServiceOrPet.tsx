import { Alert, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import userRegister from '@/services/userRegister';
import ButtonNoColor from '@/components/ButtonNoColor';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProps } from '@/interfaces/UserProps';
import petRegister from '@/services/petRegister';

export default function RegisterScreen() {

  const [nameOrTitle, setNameOrTitle] = useState('');
  const [speciesOrDescription, setSpeciesOrDescription] = useState('');
  const [userData, setUserData] = useState<UserProps>();

  const registerPetOrService = () => {
    if (userData && userData.document.length === 14) {

    } else if (userData && userData.document.length === 11) {
      petRegister(nameOrTitle, speciesOrDescription, userData);
    }

    setNameOrTitle('');
    setSpeciesOrDescription('');
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
      <Text style={styles.title}>Register Pet</Text>
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
