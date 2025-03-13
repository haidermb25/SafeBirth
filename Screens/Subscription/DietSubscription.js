import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getDietSubscription } from '../../Api/SubscriptionAPi';

const DietSubscription = ({ navigation }) => {
    const [expandedWeek, setExpandedWeek] = useState(null);
    const [weeksData, setWeeksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeeksData = async () => {
            try {
                const response = await getDietSubscription();
                const data = response?.data;
                console.log("API Response:", data);
                if (!Array.isArray(data)) {
                    throw new Error("Invalid or missing data");
                }

                // Group weeks by `weeknumber`
                const groupedWeeks = data.reduce((acc, item) => {
                    if (!item.weeknumber) return acc; // Ignore invalid data

                    if (!acc[item.weeknumber]) {
                        acc[item.weeknumber] = {
                            weeknumber: item.weeknumber,
                            iscompleted: item.iscompleted,
                            meals: [],
                        };
                    }

                    acc[item.weeknumber].meals.push(`${item.mealtype || 'Unknown'}: ${item.fooditems || 'Not specified'}`);
                    return acc;
                }, {});

                // Convert object back to array
                const mergedWeeks = Object.values(groupedWeeks);

                setWeeksData(mergedWeeks);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeeksData();
    }, []);

    const handleWeekPress = useCallback((week) => {
        setExpandedWeek(prev => (prev === week ? null : week));
    }, []);

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (weeksData.length === 0) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.emptyText}>No diet plan data available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Diet Subscription</Text>
            </View>

            {/* Scrollable Weeks List */}
            <ScrollView>
                {weeksData.map((item, index) => {
                    const { weeknumber, iscompleted, meals } = item;
                    return (
                        <View key={weeknumber} style={styles.weekContainer}>
                            <TouchableOpacity onPress={() => handleWeekPress(weeknumber)} style={styles.weekHeader}>
                                <Text style={styles.weekText}>Week {weeknumber}</Text>
                                <FontAwesome
                                    name={iscompleted ? 'check-circle' : 'times-circle'}
                                    size={24}
                                    color={iscompleted ? 'green' : 'red'}
                                />
                            </TouchableOpacity>
                            {expandedWeek === weeknumber && (
                                <View style={styles.weekInfo}>
                                    {meals.map((meal, idx) => (
                                        <Text key={idx} style={styles.infoText}>{meal}</Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    weekContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    weekHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    weekText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    weekInfo: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderLeftWidth: 4,
        borderLeftColor: '#007bff',
    },
    infoText: {
        fontSize: 16,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    },
});

export default DietSubscription;
