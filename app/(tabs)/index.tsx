import { StatusBar, View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
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
import LoadingSpinner from '@/components/LoadingSpinner';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import { toggleTodo } from '@/convex/todos';

type Todo = Doc<"todos">


const Index = () => {
  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos)
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const isLoading = todos === undefined
  if(isLoading) return <LoadingSpinner/>

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({id})
    } catch (error){
      console.log("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  const renderTodoItem = ({item}: {item:Todo}) => {

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
        colors = {colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{x:0 , y:0}}
        end={{x:1 , y:1}}
        >
          <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={0.7}
          onPress={()=> handleToggleTodo(item._id)}
          >
            <LinearGradient
            colors={item.isCompleted ? colors.gradients.success: colors.gradients.muted}
            style={[
              homeStyles.checkboxInner,
              {borderColor: item.isCompleted ? "transparent" : colors.border}
            ]}
            >
              {
                item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff"/>
              }
            </LinearGradient>
          </TouchableOpacity>
          <View>
            <Text
            style={[
              homeStyles.todoText,
              item.isCompleted && {
                textDecorationLine: "line-through",
                color: colors.textMuted,
                opacity: 0.6,
              },
            ]}
            >
              {item.text}
            </Text>

            <View style={homeStyles.todoActions}>
              <TouchableOpacity onPress={()=>{}}
              activeOpacity={0.8}
              >
                <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{}}
              activeOpacity={0.8}
              >
                <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

          </View>
        </LinearGradient>
      </View>
    )
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} backgroundColor={colors.bg} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput/>

        <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item._id}
        style={homeStyles.todoList}
        contentContainerStyle = {homeStyles.todoListContent}
        />

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
