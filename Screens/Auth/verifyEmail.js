import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from '@react-navigation/native';
import { AfterEmailVerification } from "../../Api/SignUp";

const EmailVerificationScreen = () => {
  const navigation=useNavigation()
  const route = useRoute();
  const { name, username, email, password, gender } = route.params; // Extract the passed data

  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6-digit code
  const inputRefs = useRef([]); // Refs for input boxes
  const correctCode = "123456"; // Hardcoded code for demonstration

  // Handle input change and auto-focus
  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Focus the next input
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Focus the previous input
    }
  };

  const handleSubmit =async () => {
   const response=await AfterEmailVerification(name,username,email,password,gender,code.join(""))
    if (response.success==true) {
      Toast.show({
        type: "success",
        text1: "Code Verified",
        text2: "Your email has been successfully verified.",
        position: "top",
        visibilityTime: 2000,
      });
      setTimeout(() => {
        navigation.navigate("Login")
      }, 1000);
      
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Code",
        text2: "The code you entered is incorrect.",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  const handleResendCode = () => {
    Toast.show({
      type: "info",
      text1: "Code Resent",
      text2: "A new verification code has been sent to your email.",
      position: "top",
      visibilityTime: 2000,
    });
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus(); // Focus on the first input
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Email Verification</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to your email: {email}
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeBox}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleCodeChange(value, index)}
            ref={(input) => (inputRefs.current[index] = input)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <Toast />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  codeBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    textAlign: "center",
    marginRight: 2,
    fontSize: 20,
    color: "#333",
    backgroundColor: "#F6F6F6",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#00C781",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendText: {
    fontSize: 16,
    color: "#00C781",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

export default EmailVerificationScreen;
