import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getChildName } from '../../Api/Games';

const NameFusion = () => {
    const navigation = useNavigation();
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [boysNames, setBoysNames] = useState([]);
    const [girlsNames, setGirlsNames] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setBoysNames([]);
        setGirlsNames([]);
        
        try {
            const response = await getChildName(fatherName, motherName);
            console.log("API Response:", response);

            if (response && response.data && response.data.response) {
                const text = response.data.response.text;
                
                const boysMatch = text.match(/\[Boys:\s(.*?)\]/);
                const girlsMatch = text.match(/\[Girls:\s(.*?)\]/);

                const boys = boysMatch ? boysMatch[1].split(", ") : [];
                const girls = girlsMatch ? girlsMatch[1].split(", ") : [];

                setBoysNames(boys);
                setGirlsNames(girls);
            } else {
                setError("No names found.");
            }
        } catch (error) {
            console.error("Error fetching names:", error);
            setError("Error retrieving names.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#2E7D32" />
            </TouchableOpacity>

            <Text style={styles.header}>Baby Name Generator</Text>

            <Text style={styles.label}>Father's Name:</Text>
            <TextInput
                style={styles.input}
                value={fatherName}
                onChangeText={setFatherName}
                placeholder="Enter Father's Name"
            />

            <Text style={styles.label}>Mother's Name:</Text>
            <TextInput
                style={styles.input}
                value={motherName}
                onChangeText={setMotherName}
                placeholder="Enter Mother's Name"
            />

            <Button title="Generate Names" onPress={handleSubmit} color="#4CAF50" disabled={loading} />

            {loading && <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {boysNames.length > 0 && (
                <View style={styles.nameContainer}>
                    <Text style={styles.sectionTitle}>Boys Names</Text>
                    <FlatList
                        data={boysNames}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Text style={styles.nameItem}>👦 {item}</Text>}
                    />
                </View>
            )}

            {girlsNames.length > 0 && (
                <View style={styles.nameContainer}>
                    <Text style={styles.sectionTitle}>Girls Names</Text>
                    <FlatList
                        data={girlsNames}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Text style={styles.nameItem}>👧 {item}</Text>}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E8F5E9',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2E7D32',
        marginBottom: 20,
        marginTop: 50, // Adjusted to fit under the back button
    },
    label: {
        fontSize: 16,
        color: '#388E3C',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#388E3C',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    loader: {
        marginVertical: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    nameContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#C8E6C9',
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1B5E20',
        marginBottom: 10,
        textAlign: 'center',
    },
    nameItem: {
        fontSize: 16,
        color: '#2E7D32',
        paddingVertical: 5,
        textAlign: 'center',
    },
});

export default NameFusion;
