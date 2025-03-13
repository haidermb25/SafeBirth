import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    TextInput,
    Platform,
    Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { subscribeDietPlan } from "../../Api/DietRecommendation";
import Toast from "react-native-toast-message";

const DietCard = ({ data }) => {
    const navigation = useNavigation();
    const [weekNo, setWeekNo] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubscribe = () => {
        if (Platform.OS === "ios") {
            Alert.prompt(
                "Enter Week Number",
                "Please enter a week number between 1 and 36:",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "OK",
                        onPress: (input) => {
                            const weekNumber = parseInt(input, 10);
                            if (weekNumber >= 1 && weekNumber <= 36) {
                                subscribeDietPlan(data.dietplanid, weekNumber);
                            } else {
                                Alert.alert("Invalid Week Number", "Please enter a valid week number between 1 and 32.");
                            }
                        },
                    },
                ],
                "plain-text",
                ""
            );
        } else {
            setModalVisible(true);
        }
    };

    const handleConfirmSubscription = async () => {
        const weekNumber = parseInt(weekNo, 10);
        if (weekNumber >= 1 && weekNumber <= 36) {
            try {
                const response = await subscribeDietPlan(data.dietplanid, weekNumber);
                console.log(response);  
    
                if (response || response.statusCode == 200) {
                    Toast.show({
                        type: "success",
                        text1: "Subscribed!",
                        text2: "You have successfully subscribed.",
                        position: "top",
                        visibilityTime: 2000,
                    });
                    navigation.navigate("Dashboard");
                    setModalVisible(false);
                    setWeekNo(""); // Clear the input after subscription
                } else {
                    throw new Error("Subscription failed");
                }
            } catch (error) {
                console.error("Subscription Error:", error);
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Error in subscription",
                    position: "top",
                    visibilityTime: 2000,
                });
            }
        } else {
            Alert.alert("Invalid Week Number", "Please enter a valid week number between 1 and 32.");
        }
    };
    

    const handleDetails = () => {
        navigation.navigate("DietDetail", { id: String(data.dietplanid || "") });
    };

    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <FontAwesome5 name="apple-alt" size={40} color="#28a745" />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{data.planname}</Text>
                <Text style={styles.duration}>Duration: {data.duration} days</Text>

                <ScrollView style={styles.descriptionContainer}>
                    {data.description && typeof data.description === "string" ? (
                        <Text style={styles.description}>{data.description}</Text>
                    ) : null}
                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
                    <Text style={styles.subscribeText}>Subscribe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.detailsButton]}
                    onPress={handleDetails}
                >
                    <Text style={styles.detailsText}>Details</Text>
                </TouchableOpacity>
            </View>

            {/* Android Modal for Week Number Input */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter Week Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter week number (1-32)"
                            keyboardType="numeric"
                            value={weekNo}
                            onChangeText={setWeekNo}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleConfirmSubscription}>
                                <Text style={styles.modalButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        maxWidth: "98%",
        alignSelf: "center",
        position: "relative",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        backgroundColor: "#f0f8f4",
        borderRadius: 30,
        marginRight: 15,
        alignSelf: "flex-start",
    },
    contentContainer: {
        flex: 1,
        marginRight: 15,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    duration: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    descriptionContainer: {
        maxHeight: 70,
        marginBottom: 10,
    },
    description: {
        fontSize: 12,
        color: "#777",
        lineHeight: 18,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        width: "55%",
    },
    button: {
        width: 78,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#28a745",
        marginLeft: 5,
    },
    subscribeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    detailsButton: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#28a745",
    },
    detailsText: {
        color: "#28a745",
        fontSize: 12,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#ccc",
    },
    confirmButton: {
        backgroundColor: "#28a745",
    },
    modalButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default DietCard;
