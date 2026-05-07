import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// 1. Uvezi AuthProvider
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* 2. Omotaj cijeli Stack unutar AuthProvider-a */}
      <AuthProvider>
        <Stack>
          {/* Glavni tabovi - Expo Router će ovdje učitati tvoj (tabs)/_layout.tsx */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* Modalni prozor koji smo spominjali u navigaciji */}
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Informacije' }} />
        </Stack>
        
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}