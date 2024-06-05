import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function TabLayout() {
  const [userDoc, setUserDoc] = useState('');
  const colorScheme = useColorScheme();

  const getUserData = async () => {
    const jsonValue = await AsyncStorage.getItem('@AuthPetAZ');
    const jsonValueFormatted = jsonValue != null ? JSON.parse(jsonValue) : null;
    setUserDoc(jsonValueFormatted.document);
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="servicesOrPets"
        options={{
          title: userDoc.length === 14 ? 'Services' : 'Pets',
          tabBarIcon: ({ color }) => {
            if (userDoc.length === 14) {
              return <MaterialCommunityIcons name="room-service" size={28} color={color} />
            } else {
              return <MaterialIcons name="pets" size={28} color={color} />
            }
          },
        }}
      />

    </Tabs>
  );
}
