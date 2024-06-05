// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
import 'react-native-reanimated';

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '/login'
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   ...FontAwesome.font,
  // });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  // return <RootLayoutNav />;
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="registerServiceOrPet" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
    </Stack>
  );
}

// const RootLayoutNav: React.FC = () => {
//   return (
//     <Stack initialRouteName="login">
//       <Stack.Screen redirect name="login" options={{ headerShown: false }} />
//       <Stack.Screen name="register" options={{ headerShown: false }} />
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
//     </Stack>
//   );
// }
