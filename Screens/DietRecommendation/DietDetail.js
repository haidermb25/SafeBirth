import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For icons like arrow-back and chevron
import { FontAwesome5 } from '@expo/vector-icons'; // For meal-related icons
import { useRoute } from '@react-navigation/native';
import { GetDetailById } from '../../Api/DietRecommendation'; // Assuming fetchDietDetailById is your API function

const DietDetail = () => {
    const navigation = useNavigation();
    const [selectedTrimester, setSelectedTrimester] = useState('trimester1'); // Default to Trimester 1
    const [dietDetails, setDietDetails] = useState([]); // State to store diet details
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors
    const [expandedWeek, setExpandedWeek] = useState(null); // State to track expanded week
    const route = useRoute();   
    const { id } = route.params;  // Get dietplan id from route params

    // Fetch diet details by id when the component mounts
    useEffect(() => {
        const getDietDetails = async () => {
            setLoading(true);
            try {
                const result = await GetDetailById(id);  // Call API with the passed id
                if (result && result.statusCode === 200) {
                    setDietDetails(result.data); // Store fetched data
                } else {
                    setError('No diet details found');  
                }
            } catch (error) {
                setError('Error fetching diet details');
            }
            setLoading(false);
        };

        getDietDetails();
    }, [id]);  // Dependency on id, so it refetches when id changes

    // Show loading or error message if necessary
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Diet Detail</Text>
                </View>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Diet Detail</Text>
                </View>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    // Function to filter the weeks based on trimester
    const filterWeeksForTrimester = (trimester) => {
        const startWeek = (parseInt(trimester.replace('trimester', '')) - 1) * 9 + 1;
        const endWeek = startWeek + 8;

        return dietDetails.filter(item => item.weeknumber >= startWeek && item.weeknumber <= endWeek);
    };

    // Group the diet details by week number to avoid displaying the same week multiple times
    const groupByWeek = (data) => {
        const groupedData = {};
        data.forEach(item => {
            if (!groupedData[item.weeknumber]) {
                groupedData[item.weeknumber] = [];
            }
            groupedData[item.weeknumber].push(item);
        });
        return Object.entries(groupedData).map(([week, details]) => ({ weeknumber: week, details }));
    };

    const renderDietDetail = ({ item }) => {
        const { weeknumber, details } = item;
        const isExpanded = expandedWeek === weeknumber;
        const detailsText = details.map((detail, index) => (
            <View key={index} style={styles.detailContainer}>
                <FontAwesome5 name="utensils" size={18} color="#34C759" style={styles.mealIcon} />
                <Text style={styles.detailText}>{detail.mealtype}: {detail.fooditems}</Text>
            </View>
        ));

        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => setExpandedWeek(isExpanded ? null : weeknumber)}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.weekText}>Week {weeknumber}</Text>
                        <Ionicons 
                            name={isExpanded ? "chevron-up" : "chevron-down"} 
                            size={24} 
                            color="#34C759" 
                        />
                    </View>
                    {isExpanded && (
                        <View style={styles.expandedDetails}>
                            {detailsText}
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Row for Title and Arrow */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.header}>Diet Detail</Text>
            </View>

            {/* Trimester selection buttons */}
            <View style={styles.trimesterContainer}>
                <TouchableOpacity 
                    style={[styles.trimesterCard, selectedTrimester === 'trimester1' && styles.selectedTrimester]}
                    onPress={() => setSelectedTrimester('trimester1')}>
                    <Text style={[styles.trimesterText, selectedTrimester === 'trimester1' && styles.selectedTrimesterText]}>Trimester 1</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.trimesterCard, selectedTrimester === 'trimester2' && styles.selectedTrimester]}
                    onPress={() => setSelectedTrimester('trimester2')}>
                    <Text style={[styles.trimesterText, selectedTrimester === 'trimester2' && styles.selectedTrimesterText]}>Trimester 2</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.trimesterCard, selectedTrimester === 'trimester3' && styles.selectedTrimester]}
                    onPress={() => setSelectedTrimester('trimester3')}>
                    <Text style={[styles.trimesterText, selectedTrimester === 'trimester3' && styles.selectedTrimesterText]}>Trimester 3</Text>
                </TouchableOpacity>
            </View>

            {/* Display selected trimester diet details */}
            {selectedTrimester && (
                <FlatList
                    data={groupByWeek(filterWeeksForTrimester(selectedTrimester))}
                    renderItem={renderDietDetail}
                    keyExtractor={(item) => item.weeknumber.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 40,
        backgroundColor: '#f9f9f9', // Light background for the whole screen
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    arrowButton: {
        padding: 8,
        backgroundColor: '#34C759', // Green background for the arrow
        borderRadius: 10,
        marginRight: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#34C759', // Green color for the header
        flex: 1,
    },
    trimesterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        marginTop: 8,
    },
    trimesterCard: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#28a745', // Green border
    },
    selectedTrimester: {
        backgroundColor: '#28a745', // Green background when selected
        borderColor: '#28a745',
    },
    selectedTrimesterText: {
        color: '#ffffff', // White text for selected trimester
    },
    trimesterText: {
        fontSize: 16,
        color: '#34C759', // Green text for unselected trimester buttons
    },
    card: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    weekText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#34C759', // Green text for week number
    },
    expandedDetails: {
        marginTop: 12,
        paddingLeft: 16,
        borderLeftWidth: 2,
        borderLeftColor: '#34C759',
        paddingVertical: 8,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    mealIcon: {
        marginRight: 10,
    },
    detailText: {
        fontSize: 14,
        color: '#333333', // Dark gray text for the details
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

export default DietDetail;
