import React, { useEffect } from 'react';
import { Pressable, View, Text } from 'react-native';
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomProfileDrawer from "./src/navigation/Profile";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './src/screens/Onboarding';
import DrawerOne from './src/drawer/DrawerOne';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawer from './navigation/CustomDrawer';

function Home({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to our Home Screen</Text>
            <Text>Checkout screens from the tab below</Text>
            <Pressable
                onPress={() => navigation.openDrawer()}
                style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
                <Text>Open Drawer</Text>
            </Pressable>
        </View>
    );
}

function Conference({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Conference Details</Text>
            <Pressable
                onPress={() => navigation.navigate('Story')}
                style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
                <Text>Go to Story</Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.openDrawer()}
                style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
                <Text>Open Drawer</Text>
            </Pressable>
        </View>
    );
}

function Story({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Our Story</Text>
            <Pressable
                onPress={() => navigation.navigate('Conference')}
                style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
                <Text>Go to Conference</Text>
            </Pressable>
        </View>
    );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function RootMain({ colorScheme }) {
    const [localSession, setLocalSession] = React.useState(false);
    const user = useSelector((state) => state.user);

    const checkSession = async () => {
        const objSession = await AsyncStorage.getItem("@saveSession");
        if (objSession === null) {
            return;
        } else {
            setLocalSession(true);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <NavigationContainer
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Drawer.Navigator
                // useLegacyImplementation
                screenOptions={{
                    headerShown: false,
                    // headerShown: true,
                    // drawerStyle: {
                    //     backgroundColor: colorScheme === "dark" ? "#1F2937" : "#FAFAF9",
                    //     width: '80%',
                    // },
                    // drawerActiveTintColor: colorScheme === "dark" ? "#DCDCDC" : "#0D85FB",
                    // drawerLabelStyle: {
                    //     color: colorScheme === "dark" ? "#FAFAF9" : "#1F2937",
                    // },
                }}
                drawerContent={(props) => (
                    <CustomProfileDrawer
                        {...props}
                        setLocalSession={setLocalSession}
                        localSession={localSession}
                    // toggleColorMode={toggleColorMode}
                    />
                )}
            >
                {user?.TIPO_USUARIO === "5" && DrawerOne()}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default RootMain;
