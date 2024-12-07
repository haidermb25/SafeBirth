import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { addPost } from "../../Api/AllPosts";
const PostUploadComponent = ({ onNewPost }) => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  useEffect(() => {
    // Cleanup function that sets isMounted to false when component unmounts
    return () => setIsMounted(false);
  }, []);

  //Image Picker
   const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePostSubmit = async () => {
 
    const response = await addPost(postText, postImage);

    // Handle success or failure
    if (response) {
      alert("Post Uploaded Successfully!");
      setPostText("")
      setPostImage("")
    } else {
      alert("There is some Problem!");
    }
  };

  return (
    <View style={styles.container}>
      {/* User Avatar and Name */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://via.placeholder.com/50" }} // Avatar image URL
        />
        <Text style={styles.userName}>New Post</Text>
      </View>

      {/* Post Text Input */}
      <TextInput
        style={styles.textInput}
        placeholder="What's on your mind?"
        value={postText}
        onChangeText={setPostText}
        multiline
        numberOfLines={4}
      />

      {/* Browse Image Button */}
      <TouchableOpacity style={styles.filePicker} onPress={handleImagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <>
            <Text style={styles.icon}>📂</Text>
            <Text style={styles.text}>Select file</Text>
          </>
        )}
      </TouchableOpacity>
      {/* Display Selected Image */}
      {postImage && (
        <Image source={{ uri: postImage }} style={styles.selectedImage} />
      )}

      {/* Post Upload Button */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity
      onPress={handlePostSubmit}
      disabled={isUploading}
      style={[
        styles.button,
        isUploading ? styles.uploadingText : styles.buttonEnabled,
      ]}
    >
      <Text style={styles.buttonText}>
        {isUploading ? "Uploading..." : "Upload Post"}
      </Text>
    </TouchableOpacity>
      </View>

      {/* Upload status message */}
      {isUploading && (
        <Text style={styles.uploadingText}>Uploading your post...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 20, // Added margin from the top for spacing
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15, // Increased margin bottom to create space
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18, // Slightly larger text for the user's name
    fontWeight: "bold",
    color: "#333",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    backgroundColor: "#f2f2f2",
    marginBottom: 15, // Increased margin for better spacing
    textAlignVertical: "top", // Align text at the top of the input
  },
  button: {
    width: 360, // Set width
    height: 60, // Set height
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8, // Rounded corners
    marginVertical: 10,
  },
  buttonEnabled: {
    backgroundColor: "#28a745", // Green color for enabled state
  },
  buttonDisabled: {
    backgroundColor: "#ccc", // Gray color for disabled state
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 18, // Text size
    fontWeight: "bold",
  },
  filePicker: {
    marginLeft:0,
        width: 360,
        height: 200,
        borderWidth: 1,
        borderColor: "#0f0",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        marginBottom: 20,
      },
      icon: {
        fontSize: 40,
        marginBottom: 10,
        color: "#aaa",
      },
      text: {
        color: "#aaa",
        fontSize: 16,
      },
      imagePreview: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
      },
});

export default PostUploadComponent;




// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// const FilePicker = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [buttonText, setButtonText] = useState("Submit");

//   const handleImagePicker = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.filePicker} onPress={handleImagePicker}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.imagePreview} />
//         ) : (
//           <>
//             <Text style={styles.icon}>📂</Text>
//             <Text style={styles.text}>Select file</Text>
//           </>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={() => alert(`You clicked: ${buttonText}`)}
//       >
//         <Text style={styles.submitButtonText}>{`${buttonText} to New Post`}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   filePicker: {
//     width: 200,
//     height: 150,
//     borderWidth: 1,
//     borderColor: "#0f0",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     marginBottom: 20,
//   },
//   icon: {
//     fontSize: 40,
//     marginBottom: 10,
//     color: "#aaa",
//   },
//   text: {
//     color: "#aaa",
//     fontSize: 16,
//   },
//   imagePreview: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   submitButton: {
//     width: 150,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#007BFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default FilePicker;
