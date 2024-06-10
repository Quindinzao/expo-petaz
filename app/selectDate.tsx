import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import { router, useLocalSearchParams } from 'expo-router';
import ButtonNoColor from '@/components/ButtonNoColor';
import appointmentRegister from '@/services/appointmentRegister';

export default function SelectDateScreen() {
  const itemFromSelectPet = useLocalSearchParams();
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const isObjectComplete = (obj: any) => {
    return Object.values(obj).every(value => value !== null && value !== undefined && value !== '');
  };

  const createAppointment = () => {
    if (date) {
      const appointment = {
        appointmentRegister: date,
        service: {
          id: itemFromSelectPet.serviceId,
          title: itemFromSelectPet.serviceTitle,
          description: itemFromSelectPet.serviceDescription,
          user: {
            id: itemFromSelectPet.userServiceId,
            name: itemFromSelectPet.userServiceName,
            document: itemFromSelectPet.userServiceDocument,
            email: itemFromSelectPet.userServiceEmail,
            password: itemFromSelectPet.userServicePassword
          }
        },
        pet: {
          id: itemFromSelectPet.petId,
          name: itemFromSelectPet.petName,
          species: itemFromSelectPet.petSpecies,
          user: {
            id: itemFromSelectPet.userPetId,
            name: itemFromSelectPet.userPetName,
            document: itemFromSelectPet.userPetDocument,
            email: itemFromSelectPet.userPetEmail,
            password: itemFromSelectPet.userPetPassword
          }
        }
      }
      if (isObjectComplete(appointment)) {
        appointmentRegister(
          appointment.appointmentRegister, 
          appointment.service, 
          appointment.pet
        )
          .then(() => {
            setError('');
            setDate('');
            router.back();
          })
          .catch(error => {
            setError(error.message);
          });
      } 
    } else {
      setError('Please, complete all fields!');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select date</Text>
      <View style={styles.separator} lightColor="#000" darkColor="#000" />
      <TextField 
        placeholder={"Date"} 
        value={date} 
        onChangeText={setDate} />
      <Button title='Create appointment' onPress={createAppointment} />
      <ButtonNoColor title='Back' onPress={() => router.back()} />
      <Text style={styles.error}>{error}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
