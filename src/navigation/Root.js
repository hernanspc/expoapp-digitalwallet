import * as React from "react";
import { DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Onboarding from "../screens/Onboarding";
import { Ionicons } from "@expo/vector-icons";
import Chats from "../screens/Chats";
import NewPost from "../screens/NewPost";
import ChatRoom from "../screens/ChatRoom";
import ContactProfile from "../screens/ContactProfile";
import NewChat from "../screens/NewChat";
import NotificationsScreen from "../screens/NotificationsScreen";
import ShowPost from "../screens/ShowPost";
import { useSelector } from "react-redux";
import { View, Text, Button } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button
        title="Open drawer"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Button
        title="Toggle drawer"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}

export default function Root({ colorScheme }) {
  console.log('root ')
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <MyDrawer />
      {/* <BottomNavigation /> */}
    </NavigationContainer>
  );
}

function BottomNavigation() {
  const { notifications } = useSelector((state) => state.notifications);
  const unSeenNotifications = notifications.filter(
    (not) => not.isSeen === false
  );
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
          headerShown: false,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="ChatsStack"
        component={ChatsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-chatbubbles" color={color} />
          ),
          headerShown: false,
          tabBarLabel: "Chats",
        }}
      />
      <Tab.Screen
        name="NotificationsStack"
        component={NotificationsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-notifications" color={color} />
          ),
          headerShown: false,
          tabBarLabel: "Notifications",
          tabBarBadge:
            unSeenNotifications.length === 0
              ? null
              : unSeenNotifications.length,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle" color={color} />
          ),
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Feed}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding"
        component={Feed}
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name="NewPost"
        component={Feed}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="ShowPost" component={Feed} />
      <Stack.Screen name="ChatRoom" component={Feed} />
    </Stack.Navigator>
  );
}

function ChatsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{
          presentation: "modal",
          headerTitle: "New Chat",
        }}
      />
      <Stack.Screen
        name="ContactProfile"
        component={ContactProfile}
        options={{ presentation: "modal", headerTitle: "Contact Info" }}
      />
    </Stack.Navigator>
  );
}

function NotificationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="ShowPost" component={ShowPost} />
      <Stack.Screen
        name="ContactProfile"
        component={ContactProfile}
        options={{ presentation: "modal", headerTitle: "Contact Info" }}
      />
    </Stack.Navigator>
  );
}

function TabBarIcon(props) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}
