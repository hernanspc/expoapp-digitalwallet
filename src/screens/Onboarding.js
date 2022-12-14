import React, { useState } from "react";
import MyText from "../components/MyText";
import { View } from "../components/themed/Themed";
import MyButton from "../components/MyButton";
import { Image, StyleSheet, Text, TouchableOpacity, View as DefaultView, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { resetNotificationToken } from "../features/user";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";
import { updateUserNotificationToken } from "../utils/userOperations";
import { ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Onboarding() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false)
  const [layouts, setLayout] = useState(null);
  const insets = useSafeAreaInsets();
  const theme = useColorScheme();

  async function handleOnContinue() {
    setIsLoading(true);
    try {
      const token = await registerForPushNotificationsAsync();
      if (token !== null) {
        await updateUserNotificationToken(user, token);
        // dispatch(resetNotificationToken(token));
      }
      await AsyncStorage.setItem("@firstLaunch", "true");
      navigation.navigate("Home");
      setIsLoading(false);
    } catch (e) {
      console.log("Onboarding error", e);
    }
  }

  console.log('theme ', theme)

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme === 'light' ? "#F5F8FF" : "#373737"
    }}>
      <MyText style={styles.title} type="title">
        Bienvenido 👋
      </MyText>
      <MyText style={[styles.title, { marginBottom: 30 }]} type="title">
        Remesas  App
      </MyText>
      <View style={{ backgroundColor: theme === 'light' ? "#F5F8FF" : "#373737" }} >
        <View style={[styles.logoView, { backgroundColor: theme === 'light' ? "#F5F8FF" : "#373737", paddingBottom: 50, }]}>
          <View onLayout={({ nativeEvent }) => setLayout(nativeEvent?.layout)} style={{ backgroundColor: theme === 'light' ? "#F5F8FF" : "#373737" }}>

            <Image source={
              theme === 'light' ?
                require('../assets/images/card_welcome_1.png')
                :
                require('../assets/images/card_welcome_2.png')
            }
              style={{ backgroundColor: theme === 'light' ? "#F5F8FF" : "#373737" }}
            />
          </View>
        </View>
      </View>

      {appFeatures.map((feature, index) => (
        <View key={index} style={[styles.itemContainer, { backgroundColor: theme === 'light' ? "#F5F8FF" : "#373737" }]}>
          <Image source={feature.icon} style={styles.icon} />
          <DefaultView style={styles.textWrapper}>
            <MyText type="caption" style={{ fontWeight: "bold" }}>
              {feature.title}
            </MyText>
            <MyText type="caption">{feature.description}</MyText>
          </DefaultView>
        </View>
      ))}

      <MyButton
        style={{ marginTop: 50 }}
        title={isLoading ? "Cargando..." : "Continuar"}
        onPress={handleOnContinue}
      />
    </View>


  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  icon: {
    width: 58,
    height: 58,
    marginRight: 13,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 13,
  },
  textWrapper: {
    flexShrink: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  textDesc: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 30,
  },
  wrapText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 100,
    marginTop: 40,
  },
  cardImg1: {
    position: 'absolute',
    zIndex: 2,
    bottom: 30,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

const appFeatures = [
  // {
  //   icon: require("../../assets/post.png"),
  //   title: "Creating Post",
  //   description: "Create post and share ideas with members of the community",
  // },
  // {
  //   icon: require("../../assets/message.png"),
  //   title: "Create chats with friends",
  //   description:
  //     "Start a conversation with friends, send messages at the speed of light",
  // },
  {
    icon: require("../../assets/bell.png"),
    title: "Manténgase actualizado con notificaciones",
    description:
      "",
  },
];
