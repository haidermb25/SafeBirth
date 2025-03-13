import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import ExerciseCard from '../../Components/ExerciseRecommendation/ExerciseCard';
import { fetchExercisePlanContent } from '../../Api/ExerciseRecommendation';
import SubscriptionForm from '../SubscriptionDataForms/SubscriptionForm';

const ExerciseCards = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [exerciseData, setExerciseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getExerciseData = async () => {
            setLoading(true);
            try {
                const result = await fetchExercisePlanContent();
                if (result && result.success) {
                    setExerciseData(result.data);
                } else {
                    setError('Failed to load exercise plans');
                }
            } catch (err) {
                setError('An error occurred while fetching exercise plans');
            }
            setLoading(false);
        };

        if (route.params?.recommendationResult) {
            console.log('Received recommendation:', route.params.recommendationResult);
            setExerciseData(route.params.recommendationResult.data);
            setLoading(false);
        } else {
            getExerciseData();
        }
    }, [route.params?.recommendationResult]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })} />
                    <Appbar.Content title="Exercise Plans" />
                </Appbar.Header>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })} />
                    <Appbar.Content title="Exercise Plans" />
                </Appbar.Header>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })} />
                <Appbar.Content title="Exercise Plans" />
            </Appbar.Header>

            <FlatList
                data={exerciseData}
                keyExtractor={(item, index) => item.exerciseplanid?.toString() || index.toString()}
                renderItem={({ item }) => <ExerciseCard data={item} />}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity
                style={styles.aiButton}
                onPress={() => navigation.navigate('subscriptionForm', { name: 'exercise' })}
            >
                <Text style={styles.aiButtonText}>Get AI Recommendation</Text>
            </TouchableOpacity>
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
    aiButton: {
        position: 'absolute',
        bottom: 20,
        right: 34,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    aiButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ExerciseCards;
