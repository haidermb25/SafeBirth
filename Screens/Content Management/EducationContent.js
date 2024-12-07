import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import EducationCard from "../../Components/EducationalContent/Education"; // Assuming you saved the above card as EducationCard.js
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchContent } from "../../Api/Education";

const EducationContent = () => {
  const navigation = useNavigation();
  const [contentData, setContentData] = useState([]);
  useEffect(() => {
    const getEducationData = async () => {
      const contentData = await fetchContent();
      if (contentData) {
        setContentData(contentData.data);
      } else {
        setContentData([]);
      }
    };
    getEducationData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.goBack}>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.Community}>
          <Text style={styles.headerTitle}>Educational Content</Text>
        </View>
      </View>
      {/* Education Cards Section */}

      {contentData.map((post, index) => (
        <EducationCard
          key={post.contentid}
          titleContent={post.contenttitle}
          textContent={post.contendescription}
          videoSource={post.contenturl}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4", // Light background for the entire screen
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(52, 167, 81, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  headerTitle: {
    marginRight: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default EducationContent;
