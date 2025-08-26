import { StatusBar, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import useTheme , { ColorScheme } from '@/hooks/useTheme';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { FunctionReference } from 'convex/server';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient"
import { createHomeStyles } from '@/styles/home.styles';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';




const Index = () => {
  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos)
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} backgroundColor={colors.bg} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput/>

         {todos?.map(todo => (
          <Text key={todo._id}>{todo.text}</Text>
         ))}

        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle the Mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>

  )
};
const createStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.bg,
    },
  });
  return styles;
};

export default Index

function useMutuation(addTodo: FunctionReference<"mutation", "public", { text: string; }, string & { __tableName: "todos"; }, string | undefined>) {
  throw new Error('Function not implemented.');
}
