import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // For icons
import DietDetail from '../../Screens/DietRecommendation/DietDetail';
import { useNavigation } from '@react-navigation/native';

const ExerciseCard = ({ data }) => {
      const navigation = useNavigation();
    const handleSubscribe = () => {
        // Navigation logic for Subscribe button
        // Assuming you are using React Navigation
        navigation.navigate('SubscribeScreen', { id: data.id });
    };

    const handleDetails = () => {
        // Navigation logic for Details button
        navigation.navigate('ExerciseDetail',{id:data.exerciseplanid    });
    };

    return (
        <View style={styles.card}>
            {/* Diet Icon */}
            <View style={styles.iconContainer}>
                <FontAwesome5 name="dumbbell" size={40} color="#28a745" />
            </View>

            {/* Text Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{data.planname}</Text>
                <Text style={styles.duration}>Duration: {data.duration} days</Text>

                {/* Description */}
                <ScrollView style={styles.descriptionContainer}>
                    {data.description && (
                        <Text style={styles.description}>{data.description}</Text>
                    )}
                </ScrollView>
            </View>

            {/* Buttons Container */}
            <View style={styles.buttonContainer}>
                {/* Subscribe Button */}
                <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
                    <Text style={styles.subscribeText}>Subscribe</Text>
                </TouchableOpacity>

                {/* View Details Button */}
                <TouchableOpacity style={[styles.button, styles.detailsButton]} onPress={handleDetails}>
                    <Text style={styles.detailsText}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        maxWidth: '98%', // Ensures it doesn't take full width of screen, keeping it manageable
        alignSelf: 'center', // Centers the card
        position: 'relative', // Added to enable absolute positioning of buttons
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#f0f8f4',
        borderRadius: 30,
        marginRight: 15,
        alignSelf: 'flex-start',
    },
    contentContainer: {
        flex: 1,
        marginRight: 15,
        marginBottom: 20,   
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    duration: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    descriptionContainer: {
        maxHeight: 70,  // Limit the description height, but it will scroll
        marginBottom: 10,
    },
    description: {
        fontSize: 12,
        color: '#777',
        lineHeight: 18,
    },
    buttonContainer: {
        position: 'absolute', // Positioned at the bottom
        bottom: 10, // Adjusts distance from the bottom
        right: 10, // Aligns buttons to the righ
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10, // Adds spacing between description and buttons
        width: '55%', // Adjust width to fit both buttons in a manageable size
    },
    button: {
        width: 78, // Makes the button stretch to fill space equally
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#28a745',  // Green background for subscribe button
        marginLeft:5 , // Adds spacing between buttons
    },
    subscribeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    detailsButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#28a745',
    },
    detailsText: {
        color: '#28a745',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default ExerciseCard;
