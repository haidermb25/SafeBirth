import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import Splash from "../Screens/Auth/Splash";
import Login from "../Screens/Auth/LoginPage";
import SignUp from "../Screens/Auth/SignUpPage";
import Question from "../Screens/Auth/Questionaire";
import Dashboard from "../Screens/Dashboards/Dashboard";
import NewPosts from "../Screens/CommunitySupport/NewPosts";
import UploadPost from "../Screens/CommunitySupport/UploadPost";
import PostsAnalysis from "../Screens/CommunitySupport/PostsAnalysis";
import Profile from "../Screens/Dashboards/Profile";
import ContentPosts from "../Screens/Content Management/EducationContent";
import PrivacyPolicyScreen from "../Screens/Auth/Terms&Policy";
import ChangePasswordScreen from "../Screens/Auth/changePassword";
// Stack Navigations
const Stack = createNativeStackNavigator();
function StackNavigations() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          contentStyle: {
            paddingTop: 20, // Add padding at the top
          },
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
          contentStyle: {
            paddingTop: 20, // Add padding at the top
          },
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false, contentStyle: { paddingTop: 20 } }}
      />
      <Stack.Screen
        name="Question"
        component={Question}
        options={{ headerShown: false, contentStyle: { paddingTop: 20 } }}
      />
      <Stack.Screen
        name="Terms"
        component={PrivacyPolicyScreen}
        options={{ headerShown: false, contentStyle: { paddingTop: 20 } }}
      />
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{ headerShown: false, contentStyle: { paddingTop: 0 } }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigation
const Tab = createBottomTabNavigator();

function CommunityTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? "#4CAF50" : "#888888"; // Green for selected tab, gray for unselected

          // Change the icons to more professional options
          if (route.name === "Posts") {
            iconName = focused ? "document-text" : "document-text-outline"; // More professional document icon
          } else if (route.name === "Upload") {
            iconName = focused ? "cloud-upload-outline" : "cloud-upload-sharp"; // Use the sharp variant for a more solid design
          } else if (route.name === "Analysis") {
            iconName = focused ? "stats-chart" : "stats-chart-outline"; // More analytical-looking icon
          }

          return (
            <Ionicons
              name={iconName}
              size={30} // Standard icon size for a professional look
              color={iconColor}
            />
          );
        },
        tabBarShowLabel: false, // Hide the label
        tabBarStyle: {
          height: 70, // Increase tab bar height to accommodate larger icons and a cleaner design
          backgroundColor: "#FFFFFF", // Use a clean white background
          borderTopWidth: 1, // Thin border for neatness
          borderTopColor: "#E5E5E5", // Light border color for soft look
          shadowColor: "#000", // Shadow color for depth
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1, // Subtle shadow
          shadowRadius: 4,
        },
        tabBarActiveTintColor: "#4CAF50", // Green for the active tab
        tabBarInactiveTintColor: "#888888", // Gray for inactive tab
        tabBarLabelStyle: {
          fontSize: 16, // Increase font size for readability
          fontWeight: "600", // Semi-bold font for professional look
        },
      })}
    >
      <Tab.Screen
        name="Posts"
        component={NewPosts}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadPost}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Analysis"
        component={PostsAnalysis}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigation
const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerActiveTintColor: "#00C781",
        drawerInactiveTintColor: "black",
        drawerStyle: {
          width: 270,
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          drawerLabel: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image source={require("../Assets/Images/Mask group.png")} />
            </TouchableOpacity>
          ),
          headerShown: false,
        })}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Community Support"
        component={CommunityTabNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Pregnancy Content"
        component={ContentPosts}
        options={{ headerShown: false }}
      />
      {/* Custom Drawer Item for Logout */}
      <Drawer.Screen
        name="Logout"
        component={() => null} // Placeholder, as we handle logout manually
        options={({ navigation }) => ({
          drawerLabel: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
                marginTop: '220%',
              }}
            >
              <Ionicons name="log-out-outline" size={24} color="red" />
              <Text
                style={{
                  marginLeft: 10,
                  color: "black",
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          ),
          headerShown: false,
        })}
      />
    </Drawer.Navigator>
  );
}

// Here we start navigation
export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigations />
    </NavigationContainer>
  );
}
