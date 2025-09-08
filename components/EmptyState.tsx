import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { createHomeStyles } from '@/styles/home.styles';
import useTheme from '@/hooks/useTheme';

const EmptyState = () => {

    const { colors } = useTheme()
    const homeStyles = createHomeStyles(colors);

  return (
    <View style={homeStyles.emptyContainer}>
     <LinearGradient colors={colors.gradients.empty} style={homeStyles.emptyIconContainer}>
        <Ionicons name="clipboard-outline" size={60} color={colors.textMuted}/>
     </LinearGradient>
     <Text>No todos yet!</Text>
     <Text>Add your first todo above to get started</Text>
    </View>
  )
}

export default EmptyState;