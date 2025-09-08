import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/styles/settings.styles';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ProgressStats = () => {

    const { colors } = useTheme();
    const settingsStyles = createSettingsStyles(colors);
    const todos = useQuery(api.todos.getTodos)
    const totalTodos = todos ? todos.length : 0;
    const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0;
    const activeTodos = totalTodos - completedTodos;


    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={settingsStyles.section}
        >
            <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>

            <LinearGradient
                colors={colors.gradients.background}
                style={[settingsStyles.statCard, { borderLeftColor: colors.primary }]}
            >
                <View style={settingsStyles.statIconContainer}>
                    <LinearGradient
                        colors={colors.gradients.primary}
                        style={settingsStyles.statIcon}
                    >
                        <Ionicons name="list" size={20} color="#fff" />
                    </LinearGradient>
                </View>

                <View>
                    <Text style={settingsStyles.statNumber}>{totalTodos}</Text>
                    <Text style={settingsStyles.statLabel}>Total Todos</Text>
                </View>

            </LinearGradient>
        </LinearGradient>
    )
}

export default ProgressStats