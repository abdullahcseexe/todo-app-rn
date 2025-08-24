import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import useTheme from '@/hooks/useTheme';

const Index = () => {
  const {toggleDarkMode} = useTheme();
  return (
    <View style={styles.container}>
      <Text>Hi!! This is index page.</Text>
      <TouchableOpacity onPress={toggleDarkMode}><Text>Toggle the Mode</Text></TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Index