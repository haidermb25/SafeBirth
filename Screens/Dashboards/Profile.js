import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const UserProfile = () => {
  const [userId, setUserId] = useState(null); // State to store the userId
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const navigation = useNavigation();

  // Fetch the user data from AsyncStorage when the component is focused or reloaded
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
     
          const storedUserId = await AsyncStorage.getItem('userid'); // Assuming 'userId' is stored
          const storedEmail = await AsyncStorage.getItem('email');
          const storedName = await AsyncStorage.getItem('name');
          const storedUsername = await AsyncStorage.getItem('username');

          if (storedUserId && storedEmail && storedName && storedUsername) {
            setUserId(storedUserId);
            setEmail(storedEmail);
            setName(storedName);
            setUsername(storedUsername);
          } 
        
      };

      fetchUserData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../Assets/Images/Mask group.png')} // Replace with user's profile image
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{name || "User"}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Username</Text>
        <Text style={styles.infoValue}>{username || "Not Available"}</Text>

        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>{email || "Not Available"}</Text>

        <Text style={styles.infoLabel}>Member Since</Text>
        <Text style={styles.infoValue}>December 2024</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("Dashboard")}>
        <Text style={styles.editButtonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#00b894', // Green background similar to your dashboard
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginTop: 10,
  },
  infoValue: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  editButton: {
    marginTop: 30,
    backgroundColor: '#00b894', // Green button color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserProfile;
