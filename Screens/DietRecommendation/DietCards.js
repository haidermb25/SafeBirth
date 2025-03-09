import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Appbar } from "react-native-paper"; // Importing Appbar from react-native-paper
import { useNavigation } from "@react-navigation/native"; // For navigation
import DietCard from "../../Components/DietRecommendation/DietCard"; // Assuming you have a DietCard component like ExerciseCard
import { fetchContent } from "../../Api/DietRecommendation"; // Import the fetchContent function

const DietCards = () => {
    const navigation = useNavigation(); // Getting the navigation object
    const [dietData, setDietData] = useState([]); // State to store diet data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

    // Fetch data on component mount
    useEffect(() => {
        const getDietData = async () => {
            setLoading(true); // Set loading to true before fetching data
            const result = await fetchContent(); // Call the fetchContent function
            if (result && result.success) {
                setDietData(result.data); // Set the diet data if successful
            } else {
                setError("Failed to load diet plans");
            }
            setLoading(false); // Stop loading
        };

        getDietData(); // Fetch diet data
    }, []);

    // Show loading or error message if necessary
    if (loading) {
        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => navigation.navigate("Dashboard")} />
                    <Appbar.Content title="Diet Plans" />
                </Appbar.Header>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => navigation.navigate("Dashboard")} />
                    <Appbar.Content title="Diet Plans" />
                </Appbar.Header>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Appbar Header with Back Action */}
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.navigate("Dashboard")} />
                <Appbar.Content title={<Text>Diet Plans</Text>} />
            </Appbar.Header>

            {/* List of Diet Cards */}
            <FlatList
                data={dietData}
                keyExtractor={(item) => item.dietplanid.toString()}
                renderItem={({ item }) => <DietCard data={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "#f2f2f2",
    },
    list: {
        paddingHorizontal: 20,
    },
    loadingText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 18,
    },
    errorText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 18,
        color: "red",
    },
});

export default DietCards;
