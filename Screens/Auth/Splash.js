import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
    return () => clearTimeout();
  }, [navigation]);
  return (
    <ImageBackground
      source={require("../../Assets/Images/smileyWomen.png")} // Add your background image here
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.Icon}>
            <Image
              source={require("../../Assets/Images/addLogo.png")} // Correct path to local image
              style={styles.image}
            />
            <Text style={styles.title}>HOPE FOR MOTHERS</Text>
          </View>
          <View style={styles.bottomBar}>
            <Text style={styles.subtitle}>Welcome to SAFE BIRTH APP</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(52, 167, 81, 0.9)",
    width: "100%",
  },
  innerContainer: {
    height: "70%",
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  Icon: {
    display: "flex",
    alignItems: "center",
  },
  bottomBar: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "#fff",
  },
  subtitle: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
});
