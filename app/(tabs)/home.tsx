import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import { ServiceProps } from '@/interfaces/ServiceProps';
import getAllServices from '@/services/getAllServices';
import ItemFlat from '@/components/ItemFlat';

export default function HomeScreen() {
  const [services, setServices] = useState<Array<ServiceProps>>();
  const [userDoc, setUserDoc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const signOut = async () => {
    router.replace('/');
    await AsyncStorage.removeItem('@AuthPetAZ');
  }

  const getAllServicesRequest = async () => {
    await getAllServices()
      .then(response => {
        setServices(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
  }

  const getUserId = async () => {
    const jsonValue = await AsyncStorage.getItem('@AuthPetAZ');
    const jsonValueFormatted = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (jsonValueFormatted.document.length === 11) {
      getAllServicesRequest();
    }

    setUserDoc(jsonValueFormatted.document);
  }

  useEffect(() => {
    getUserId();
  }, [isLoading]);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const goToSelectPet = (item: any) => {
    const itemToSend = {
      serviceId: item.id,
      serviceTitle: item.title,
      serviceDescription: item.description,
      userServiceId: item.user.id,
      userServiceName: item.user.name,
      userServiceDocument: item.user.document,
      userServiceEmail: item.user.email,
      userServicePassword: item.user.password
    }
    router.push({ pathname: 'selectPet', params: itemToSend });
  };

  const renderItemServices = ({ item }: any) => (
    <ItemFlat 
      title={item.title} 
      titleLabel='Title: ' 
      body={item.description} 
      bodyLabel='Description: '
      onPress={() => goToSelectPet(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
      {userDoc.length === 11 &&
        <>
          <Text style={styles.subtitle}>Services</Text>
          <View style={styles.subseparator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
          <FlatList
            data={services}
            keyExtractor={(item: ServiceProps) => item.id}
            renderItem={renderItemServices}
            style={styles.listContainer}
          />
        </>
      }
      <Button title={"Sign Out"} onPress={() => signOut()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listContainer: {
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subseparator: {
    marginVertical: 12,
    height: 1,
    width: '90%',
  },
  subtitle: {
    width: '90%',
    margin: 0,
    padding: 0,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'left'
  }
});
