import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  // Sample policies with 4 lines of description each
  const policies = [
    {
      title: "Data Collection and Usage",
      description: "We collect personal data such as name, email, and usage data. This information helps us improve our services and provide personalized content. We ensure data is stored securely and used only for the stated purposes. Your data will never be shared with third parties without your consent."
    },
    {
      title: "User Data Security",
      description: "We employ encryption to protect your personal information. Regular security audits are conducted to ensure safety. User data is stored in secure, access-controlled environments. We follow industry-standard security practices to prevent data breaches."
    },
    {
      title: "Data Sharing and Third Parties",
      description: "We may share your data with trusted partners for specific purposes. Third-party service providers assist us in delivering services like email notifications. We ensure these partners comply with our privacy policies. Your data will not be sold or rented to any third party."
    },
    {
      title: "Data Retention Period",
      description: "We retain your data only for as long as necessary to provide our services. Once the data is no longer needed, it will be securely deleted. You can request data deletion at any time. Please refer to our Data Deletion Policy for more details."
    },
    // Add more policies as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>SafeBirth Privacy Policies</Text>
      </View>

      <View style={styles.contentContainer}>
        {policies.map((policy, index) => (
          <View key={index} style={styles.policyContainer}>
            <Text style={styles.policyTitle}>{policy.title}</Text>
            <Text style={styles.policyDescription}>{policy.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fc", // Soft background color for elegance
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50", // Fresh green header
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 6,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
    fontFamily: "Poppins", // Professional and modern font
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  policyContainer: {
    backgroundColor: "#ffffff",
    padding: 25,
    marginBottom: 20,
    borderRadius: 20, // Rounded corners for a soft feel
    borderWidth: 1,
    borderColor: "#e0e0e0", // Subtle border color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    width: "100%",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  policyTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    fontFamily: "Roboto", // Clean, readable font for title
  },
  policyDescription: {
    fontSize: 16,
    color: "#555", // Slightly lighter text color
    lineHeight: 22,
    fontFamily: "Roboto", // Consistent font family
    textAlign: "justify", // Makes text more readable
  },
});

export default PrivacyPolicyScreen;
