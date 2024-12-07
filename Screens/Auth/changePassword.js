import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const ChangePasswordScreen = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]); // State to store each digit of the code
  const [isCodeValid, setIsCodeValid] = useState(false); // Flag to check if code is valid
  const [password, setPassword] = useState(""); // State for the new password
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle password visibility

  const correctCode = "123456"; // Example hardcoded code. Replace this with your server logic

  const handleCodeSubmit = () => {
    if (code.join("") === correctCode) {
      setIsCodeValid(true);
      Toast.show({
        type: "success",
        text1: "Code Validated",
        text2: "You can now change your password.",
        position: "top",
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Code",
        text2: "Please enter the correct code.",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  const handlePasswordChange = () => {
    if (password.length >= 6) {
      Toast.show({
        type: "success",
        text1: "Password Changed",
        text2: "Your password has been updated successfully.",
        position: "top",
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Password",
        text2: "Password must be at least 6 characters long.",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  const handleChangeCode = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Automatically focus on the next box when a digit is entered
    if (value && index < 5) {
      // Focus on the next input
      setTimeout(() => {
        const nextInput = index + 1;
        if (nextInput <= 5) {
          // Make sure we have a reference to each input for focus
          const nextInputRef = inputRefs[nextInput];
          if (nextInputRef) {
            nextInputRef.focus();
          }
        }
      }, 100);
    }
  };

  const inputRefs = [];

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {!isCodeValid ? (
        <>
          <Text style={styles.title}>Enter the Code</Text>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeBox}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(value) => handleChangeCode(value, index)}
                ref={(input) => (inputRefs[index] = input)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCodeSubmit}
          >
            <Text style={styles.buttonText}>Submit Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Change Your Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePasswordChange}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
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
    fontSize: 20,
    color: "#333",
    backgroundColor: "#F6F6F6",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    position: "absolute",
    right: 30,
    top: 105,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#00C781",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;
