// External Libraries
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// Components
import { Text, View } from '@/components/Themed';
import RoundedButton from '@/components/RoundedButton';

// Services
import getPet from '@/services/getPets';

// Interfaces
import { PetProps } from '@/interfaces/PetProps';
import { ServiceProps } from '@/interfaces/ServiceProps';
import ItemFlat from '@/components/ItemFlat';

export default function ServicesOrPets() {
  const [petsData, setPetsData] = useState<Array<PetProps>>([]);
  const [servicesData, setServicesData] = useState<Array<ServiceProps>>([]);
  const [userDoc, setUserDoc] = useState('');
  const [error, setError] = useState('');
  
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

  useEffect(() => {
    getUserId();
  }, []);

  const renderItem = ({ item }: any) => (
    <ItemFlat title={item.name} description={item.species} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <RoundedButton onPress={goToCreated} />
      <Text style={styles.title}>{userDoc.length === 14 ? 'Services' : 'Pets'}</Text>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
      {/* <View style={styles.listContainer}> */}
        <FlatList
          data={petsData}
          keyExtractor={(item: PetProps) => item.id}
          renderItem={renderItem}
          style={styles.listContainer}
        />
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
