// External libraries
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';

// Components
import { Text, View } from '@/components/Themed';
import ItemFlat from '@/components/ItemFlat';
import Button from '@/components/Button';
import RefreshButton from '@/components/RefreshButton';

// Interfaces
import { ServiceProps } from '@/interfaces/ServiceProps';

// Services
import getAllServices from '@/services/getAllServices';
import getAppointments from '@/services/getAppointments';

export default function HomeScreen() {
  const [services, setServices] = useState<Array<ServiceProps>>();
  const [appointments, setAppointments] = useState<Array<ServiceProps>>();
  const [userDoc, setUserDoc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorServices, setErrorServices] = useState<string>('');
  const [errorAppointments, setErrorAppointments] = useState<string>('');

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
        setErrorServices(error.message);
      })
  }

  const getAppointmentsRequest = async (id: string, doc: string) => {
    await getAppointments(id, doc)
      .then(response => {
        setAppointments(response.data);
      })
      .catch((error) => {
        setErrorAppointments(error.message);
      })
  }

  const getUserId = async () => {
    const jsonValue = await AsyncStorage.getItem('@AuthPetAZ');
    const jsonValueFormatted = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (jsonValueFormatted.document.length > 0 && jsonValueFormatted.id.length > 0) {
      getAppointmentsRequest(jsonValueFormatted.id, jsonValueFormatted.document);
    }
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

  const renderItemAppointments = ({ item }: any) => (
    <ItemFlat 
      title={item.appointmentTime} 
      titleLabel='Date: ' 
      body={item.pet.name} 
      bodyLabel='Pet: '
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
      {!isLoading &&
        <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentScrollView} 
        scrollEnabled={true}>
          <Text style={styles.subtitle}>Appointments</Text>
          <View style={styles.subseparator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.listContainer}>
            {
              !errorAppointments &&  appointments && appointments.length > 0 && appointments.map((item: any) => {
                return (
                  <ItemFlat 
                    title={item.appointmentTime} 
                    titleLabel='Date: ' 
                    body={item.pet.name} 
                    bodyLabel='Pet: '
                  />
                )
              })
            }
            {errorAppointments && <Text style={styles.error}>{errorAppointments}</Text>}
          </View>
          {userDoc.length === 11 &&
            <>
              <Text style={styles.subtitle}>Services</Text>
              <View style={styles.subseparator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
              <View style={styles.listContainer}>
                {
                  !errorServices && services && services.length > 0 && services.map((item: any) => {
                    return (
                      <ItemFlat 
                        title={item.title} 
                        titleLabel='Title: ' 
                        body={item.description} 
                        bodyLabel='Description: '
                        onPress={() => goToSelectPet(item)}
                      />
                    );
                  })
                }
                {errorServices && <Text style={styles.error}>{errorServices}</Text>}
              </View>
            </>
          }
        </ScrollView>
      }
      {isLoading && 
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={'large'} color={'#004a7f'} />
        </View>
      }
      <Button title={"Sign Out"} onPress={() => signOut()} />
      <RefreshButton onPress={() => setIsLoading(true)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentScrollView: {
    alignItems: 'center',
  },
  error: {
    marginBottom: 36,
    color: '#6f0404',
    fontWeight: '500'
  },
  listContainer: {
    width: '100%',
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    width: '100%',
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
