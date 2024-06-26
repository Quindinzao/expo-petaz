// External Libraries
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// Components
import { Text, View } from '@/components/Themed';
import RoundedButton from '@/components/RoundedButton';
import ItemFlat from '@/components/ItemFlat';

// Services
import getPet from '@/services/getPets';
import getServicesByDoc from '@/services/getServicesByDoc';

// Interfaces
import { PetProps } from '@/interfaces/PetProps';
import { ServiceProps } from '@/interfaces/ServiceProps';
import RefreshButton from '@/components/RefreshButton';

export default function ServicesOrPets() {
  const [petsData, setPetsData] = useState<Array<PetProps>>([]);
  const [servicesData, setServicesData] = useState<Array<ServiceProps>>([]);
  const [userDoc, setUserDoc] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const goToCreated = () => {
    router.push('registerServiceOrPet');
  }

  const getPetFromUser = async (id: string) => {
    await getPet(id)
      .then(response => {
        setPetsData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }

  const getServiceFromUser = async (id: string) => {
    await getServicesByDoc(id)
      .then(response => {
        setServicesData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }

  const getUserId = async () => {
    const jsonValue = await AsyncStorage.getItem('@AuthPetAZ');
    const jsonValueFormatted = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (userDoc.length === 11) {
      getPetFromUser(jsonValueFormatted.id);
    } else if (userDoc.length === 14) {
      getServiceFromUser(jsonValueFormatted.document);
    }

    setUserDoc(jsonValueFormatted.document);
  }

  useEffect(() => {
    getUserId();
  }, [isLoading]);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const renderItemPets = ({ item }: any) => (
    <ItemFlat title={item.name} titleLabel='Name: ' body={item.species} bodyLabel='Species: ' />
  );

  const renderItemServices = ({ item }: any) => (
    <ItemFlat title={item.title} titleLabel='Title: ' body={item.description} bodyLabel='Description: ' />
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>{userDoc.length === 14 ? 'Services' : 'Pets'}</Text>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />

      {!isLoading && !error &&
        <>
          {petsData.length > 0 || servicesData.length > 0
            ? <FlatList
                data={userDoc.length === 11 ? petsData : servicesData}
                keyExtractor={(item: PetProps | ServiceProps) => item.id}
                renderItem={userDoc.length === 11 ? renderItemPets : renderItemServices}
                style={styles.listContainer}
              />
            : <Text>There are no {userDoc.length === 11 ? 'pets' : 'services'} registered here!</Text>
          }
          <RoundedButton onPress={goToCreated} />
          <RefreshButton onPress={() => setIsLoading(true)} />
        </>
      }
      {error && <Text style={styles.error}>{error}</Text>}
      {isLoading && 
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={'large'} color={'#004a7f'} />
        </View>
      }
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
  error: {
    color: '#6f0404',
    fontWeight: '500'
  },
  list: {
    alignItems: 'center',
  },
  listContainer: {
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  refreshIcon: {
    position: 'absolute',
    right: 24,
    bottom: 84
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
