import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ExerciseCard from '../../Components/ExerciseRecommendation/ExerciseCard';
import { fetchExercisePlanContent } from '../../Api/ExerciseRecommendation';

const ExerciseCards = () => {
    const navigation = useNavigation();
    const [dietData, setDietData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDietData = async () => {
            setLoading(true);
            try {
                const result = await fetchExercisePlanContent();
                if (result && result.success) {
                    setDietData(result.data);
                } else {
                    setError('Failed to load exercise plans');
                }
            } catch (err) {
                setError('An error occurred while fetching exercise plans');
            }
            setLoading(false);
        };
        getDietData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => navigation.navigate('Dashboard')} />
                    <Appbar.Content title={<Text>Exercise Plans</Text>} />
                </Appbar.Header>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => navigation.navigate('Dashboard')} />
                    <Appbar.Content title={<Text>Exercise Plans</Text>} />
                </Appbar.Header>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.navigate('Dashboard')} />
                <Appbar.Content title={<Text>Exercise Plans</Text>} />
            </Appbar.Header>

            <FlatList
                data={dietData}
                keyExtractor={(item) => item.dietplanid?.toString()}
                renderItem={({ item }) => <ExerciseCard data={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#f2f2f2',
    },
    list: {
        paddingHorizontal: 20,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'red',
    },
});

export default ExerciseCards;

// Let me know if you want me to tweak anything else! 💡
