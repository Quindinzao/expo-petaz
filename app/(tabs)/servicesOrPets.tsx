import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import RoundedButton from '@/components/RoundedButton';
import { router } from 'expo-router';

export default function ServicesScreen() {
  
  const goToCreated = () => {
    router.push('registerServiceOrPet');
  }

  return (
    <SafeAreaView style={styles.container}>
      <RoundedButton onPress={goToCreated} />
      <Text style={styles.title}>Services</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
