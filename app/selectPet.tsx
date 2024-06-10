// External Libraries
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

// Components
import { Text, View } from '@/components/Themed';
import RoundedButton from '@/components/RoundedButton';
import ItemFlat from '@/components/ItemFlat';
import RefreshButton from '@/components/RefreshButton';
import ButtonNoColor from '@/components/ButtonNoColor';

// Services
import getPet from '@/services/getPets';

// Interfaces
import { PetProps } from '@/interfaces/PetProps';
import { ServiceProps } from '@/interfaces/ServiceProps';

export default function ServicesOrPets() {
  const itemFromHome = useLocalSearchParams();
  const [petsData, setPetsData] = useState<Array<PetProps>>([]);
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

  const getUserId = async () => {
    const jsonValue = await AsyncStorage.getItem('@AuthPetAZ');
    const jsonValueFormatted = jsonValue != null ? JSON.parse(jsonValue) : null;

    getPetFromUser(jsonValueFormatted.id);

    setUserDoc(jsonValueFormatted.document);
  }

  const goToSelectDate = (item: any) => {
    const itemToSend = {
      serviceId: itemFromHome.serviceId,
      serviceTitle: itemFromHome.serviceTitle,
      serviceDescription: itemFromHome.serviceDescription,
      userServiceId: itemFromHome.userServiceId,
      userServiceName: itemFromHome.userServiceName,
      userServiceDocument: itemFromHome.userServiceDocument,
      userServiceEmail: itemFromHome.userServiceEmail,
      userServicePassword: itemFromHome.userServicePassword,
      petId: item.id,
      petName: item.name,
      petSpecies: item.species,
      userPetId: item.user.id,
      userPetName: item.user.name,
      userPetDocument: item.user.document,
      userPetEmail: item.user.email,
      userPetPassword: item.user.password
    }

    router.push({ pathname: 'selectDate', params: itemToSend })
  }

  useEffect(() => {
    getUserId();
  }, [isLoading]);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const renderItemPets = ({ item }: any) => (
    <ItemFlat 
      title={item.name} 
      titleLabel='Name: ' 
      body={item.species} 
      bodyLabel='Species: '
      onPress={() => goToSelectDate(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Select your pet</Text>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />

      {!isLoading && !error &&
        <>
          {petsData.length > 0
            ? <FlatList
                data={petsData}
                keyExtractor={(item: PetProps | ServiceProps) => item.id}
                renderItem={renderItemPets}
                style={styles.listContainer}
              />
            : <Text>There are no pets registered here!</Text>
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

<ButtonNoColor title='Back' onPress={() => router.back()} />
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
