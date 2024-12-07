import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationsComponent = ({
  postNumber,
  averageRating,
  imageSource,
  postText,
  created_date,
  isActive,
  userName,
}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.postNumber}>{userName}</Text>
        <Text style={styles.rating}>⭐ {averageRating}</Text>
      </View>
      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image source={{ uri: imageSource }} style={styles.image} />
        ) : null}
      </View>
      <View style={styles.content}>
        <Text style={styles.username}></Text>
        {postText ? <Text style={styles.postText}>{postText}</Text> : null}
        <Text style={styles.date}>{created_date}</Text>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isActive ? styles.activeStatus : styles.inactiveStatus,
          ]}
        >
          <Text style={styles.statusText}>
            {isActive ? "Active" : "Inactive"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
    marginRight: 30,
    padding: 15,
    overflow: "hidden",
    width: 320,
    alignSelf: "center",
  },
  imageContainer: {
    marginTop: 40,
  },
  headerContainer: {},
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    opacity: 0.8,
  },
  postNumber: {
    position: "absolute",
    top: 0,
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "blue",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  rating: {
    position: "absolute",
    top: 0,
    right: 10,
    fontSize: 16,
    color: "#f39c12",
  },
  content: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  username: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  postText: {
    fontSize: 14,
    color: "#333",
    marginTop: -35,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 10,
    fontStyle: "italic",
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 20,
    alignSelf: "flex-end",
    marginRight: -16,
  },
  activeStatus: {
    backgroundColor: "#2ecc71",
  },
  inactiveStatus: {
    backgroundColor: "#e74c3c",
  },
  statusText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default NotificationsComponent;
