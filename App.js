import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaView} from 'react-native';
import Auth from './auth/auth';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff",marginTop: 15}}>
        <Auth />
    </SafeAreaView>
  );
}
