import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="registerServiceOrPet" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
    </Stack>
  );
}
