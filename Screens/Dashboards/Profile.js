// import { useNavigation } from "@react-navigation/native";
// import { View, Text, Button } from "react-native";

// const Profile = () => {
//   const navigation = useNavigation();
//   return (
//     <View>
//       <Text>Hello thie is my profile</Text>
//       <Button
//         title="Go Back"
//         onPress={() => {
//           navigation.navigate("Dashboard");
//         }}
//       />
//     </View>
//   );
// };
// export default Profile;
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
const UserProfile = () => {
  const navigation=useNavigation()
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../Assets/Images/Mask group.png')} // Replace with user's profile image
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Muhammad</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>muhammad@example.com</Text>

        <Text style={styles.infoLabel}>Phone Number</Text>
        <Text style={styles.infoValue}>+123 456 789</Text>

        <Text style={styles.infoLabel}>Location</Text>
        <Text style={styles.infoValue}>New York, USA</Text>

        <Text style={styles.infoLabel}>Member Since</Text>
        <Text style={styles.infoValue}>January 2022</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => {
          navigation.navigate("Dashboard");
         }}>
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
