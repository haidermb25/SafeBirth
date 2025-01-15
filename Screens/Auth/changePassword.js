import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { changePass, EmailCheck, verifyNewOTP } from "../../Api/changePassword";

const ChangePasswordScreen = () => {
  const [stage, setStage] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const correctCode = "123456"; // Hardcoded code for demonstration

  // Refs for code inputs
  const codeRefs = useRef([]);

  const handleSendEmail = async () => {
    const data = await EmailCheck(email);
    if (data.success === false) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Email not already Exist",
        position: "top",
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Email Sent",
        text2: `A verification code has been sent to ${email}.`,
        position: "top",
        visibilityTime: 2000,
      });
      setTimeout(() => {
        setStage("code");
      }, 1000);
    }
  };

  const handleCodeSubmit = async () => {
    const data = await verifyNewOTP(email, code.join(""));
    if (data.success === true) {
      Toast.show({
        type: "success",
        text1: "Code Validated",
        text2: "You can now change your password.",
        position: "top",
        visibilityTime: 2000,
      });
      setTimeout(() => {
        setIsCodeValid(true);
        setStage("password");
      }, 500);
    } else {
      const remainingAttempts = attemptsLeft - 1;
      setAttemptsLeft(remainingAttempts);

      if (remainingAttempts > 0) {
        Toast.show({
          type: "error",
          text1: "Invalid Code",
          text2: `Incorrect code. You have ${remainingAttempts} attempts left.`,
          position: "top",
          visibilityTime: 2000,
        });
      }
    }
  };

  const validatePassword = () => {
    if (password.length < 8) return false;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialCharacter = /[@$#!^%*?&]/.test(password);
    return hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter;
  };

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Different Password!",
        text2: "Password and Confirm Password should be matched",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    if (validatePassword()) {
      const data = await changePass(email, password, confirmPassword);
      if (data.success === true) {
        Toast.show({
          type: "success",
          text1: "Password Changed",
          text2: "Your password has been updated successfully.",
          position: "top",
          visibilityTime: 2000,
        });

        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        Toast.show({
          type: "error",
          text1: "Weak Password!",
          text2: "There is some problem updating your password",
          position: "top",
          visibilityTime: 3000,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Weak Password!",
        text2: "Password must have uppercase, lowercase, special characters, and be at least 8 characters long.",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleChangeCode = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;

    // Move focus to the next field when a digit is entered
    if (value.length === 1 && index < 5) {
      codeRefs.current[index + 1]?.focus();
    } else if (value === "" && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }

    setCode(newCode);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {stage === "email" && (
        <>
          <Text style={styles.title}>Enter Your Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      )}
      {stage === "code" && (
        <>
          <Text style={styles.title}>Enter the Code </Text>
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
                onChangeText={(value) => handleChangeCode(value, index)}
                ref={(ref) => codeRefs.current[index] = ref} // Assigning the ref to each input field
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleCodeSubmit}>
            <Text style={styles.buttonText}>Submit Code</Text>
          </TouchableOpacity>
        </>
      )}
      {stage === "password" && (
        <View style={styles.container}>
          <Text style={styles.title}>Change Your Password</Text>

          {/* New Password Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
              <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleConfirmPasswordVisibility}>
              <Ionicons name={isConfirmPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Change Password Button */}
          <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign:"center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
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
    right: 10,
    top: 0,
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
  inputContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F6F6F6",
  },
  inputField: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    paddingHorizontal: 10,
  },
});

export default ChangePasswordScreen;
