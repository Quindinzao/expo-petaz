import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';

export default function HomeScreen() {
  const signOut = async () => {
    router.replace('/');
    await AsyncStorage.removeItem('@AuthPetAZ');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
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
