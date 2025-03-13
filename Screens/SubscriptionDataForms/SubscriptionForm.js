import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AIRecommendations } from '../../Api/AIRecommendations';

const SubscriptionForm = ({ navigation, route }) => {
    const [age, setAge] = useState('');
    const [pregnancyNo, setPregnancyNo] = useState('');
    const [bmi, setBmi] = useState('');
    const [multiplePregnancies, setMultiplePregnancies] = useState('No');
    const [gestationalDiabetes, setGestationalDiabetes] = useState('No');
    const [smoking, setSmoking] = useState('No');
    const [previousCSection, setPreviousCSection] = useState('No');
    const [heartDisease, setHeartDisease] = useState('No');
    const [stressLevel, setStressLevel] = useState('Low');
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('exercise');
    
    const { name } = route.params || {}; // Get the passed parameter safely


        useEffect(() => {
            if (route.params?.name) {
                setType(route.params.name);
            }
        }, [route.params]);
        
        const handleSubmit = async () => {
            if (!age || !pregnancyNo || !bmi) {
                Alert.alert('Error', 'All fields are required.');
                return;
            }
        
            if (isNaN(age) || age <= 0) {
                Alert.alert('Error', 'Please enter a valid age.');
                return;
            }
        
            setLoading(true);
            try {
                console.log({ age, pregnancyNo, multiplePregnancies, gestationalDiabetes, smoking, previousCSection, heartDisease, stressLevel, bmi, type });
        
                // Pass `type` correctly
                const response = await AIRecommendations(age, pregnancyNo, multiplePregnancies, gestationalDiabetes, smoking, previousCSection, heartDisease, stressLevel, bmi, type);
        
                navigation.navigate(type === "exercise" ? "ExerciseCards" : "DietCards", { 
                    recommendationResult: response,
                    type  // Ensure `type` is passed to the next screen
                });
        
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch recommendations.');
            } finally {
                setLoading(false);
            }
        };
        
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Subscription Form</Text>

            <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Pregnancy No." value={pregnancyNo} onChangeText={setPregnancyNo} keyboardType="numeric" />

            <CustomPicker label="Multiple Pregnancies" selectedValue={multiplePregnancies} onValueChange={setMultiplePregnancies} />
            <CustomPicker label="Gestational Diabetes" selectedValue={gestationalDiabetes} onValueChange={setGestationalDiabetes} />
            <CustomPicker label="Smoking" selectedValue={smoking} onValueChange={setSmoking} />
            <CustomPicker label="Previous C-Section" selectedValue={previousCSection} onValueChange={setPreviousCSection} />
            <CustomPicker label="Heart Disease" selectedValue={heartDisease} onValueChange={setHeartDisease} />
            <CustomPicker label="Stress Level" selectedValue={stressLevel} onValueChange={setStressLevel} options={['Low', 'High']} />

            <TextInput style={styles.input} placeholder="BMI" value={bmi} onChangeText={setBmi} keyboardType="numeric" />

            <View style={styles.buttonContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#388E3C" style={styles.loader} />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

// Reusable Picker Component
const CustomPicker = ({ label, selectedValue, onValueChange, options = ['No', 'Yes'] }) => (
    <View style={styles.pickerContainer}>
        <Text style={styles.label}>{label}</Text>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
            {options.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
            ))}
        </Picker>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F4F9F4',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#388E3C',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#388E3C',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 15,
    },
    pickerContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2E7D32',
    },
    picker: {
        height: 50,
        borderColor: '#388E3C',
        borderWidth: 1.5,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#388E3C',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    secondaryButton: {
        backgroundColor: '#2E7D32',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SubscriptionForm;
