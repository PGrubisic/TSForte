import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAsMwZzjAGXQwZWnmOW6_Pu5IErnxaYaWo",
  authDomain: "tsforteapp.firebaseapp.com",
  projectId: "tsforteapp",
  storageBucket: "tsforteapp.firebasestorage.app",
  messagingSenderId: "986711966689",
  appId: "1:986711966689:web:dae9f384bb26463a6ac8a0",
  measurementId: "G-LCM6VHFZPK"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});