import * as React from "react";
import { View } from "../components/themed/Themed";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";
import ConfirmForgotPassword from "../components/ConfirmForgotPassword";
import SignUp from "../components/SignUp";
import ConfirmSignUp from "../components/ConfirmSignUp";
import { AuthProvider, AuthContext } from "../Context/AuthContext";
import { useColorScheme, Image, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../../constants/colors";
import DefaultAuth from "../components/DefaultAuth";

export default function Wrapper() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}

function Auth() {
  const { authState } = React.useContext(AuthContext);
  const theme = useColorScheme();
  console.log('Auth ', theme)

  const image =
    theme === "dark"
      ? require("../assets/bank/crypto_bank.png")
      : require("../assets/bank/crypto_bank.png");

  if (authState === "default") {
    return <DefaultAuth />
  }

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor:
          theme === "dark" ? Colors.dark.background : Colors.light.background,
        paddingHorizontal: 17,
      }}
      contentContainerStyle={{ paddingVertical: 90 }}
    >
      <Image
        source={image}
        style={{ width: 178, height: 178, alignSelf: "center" }}
      />
      {/* {authState === "default" && <DefaultAuth />} */}

      {authState === "signIn" && <SignIn />}
      {/* <SignIn /> */}
      {/* {authState === "signUp" && <SignUp />} */}
      {/* {authState === "confirmSignUp" && <ConfirmSignUp />} */}
      {/* {authState === "forgotPassword" && <ForgotPassword />} */}
      {/* {authState === "confirmForgotPassword" && <ConfirmForgotPassword />} */}
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
    </KeyboardAwareScrollView>
  );
}
