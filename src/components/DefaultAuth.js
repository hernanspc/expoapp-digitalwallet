import * as React from "react";
import MyInput from "./MyInput";
import MyButton from "./MyButton";
import MyText from "./MyText";
import { AuthContext } from "../Context/AuthContext";
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useColorScheme } from "react-native";
import MyButtonArt from "./commons/MyButtonArt";
import Colors from "../../constants/colors";

export default function DefaultAuth() {
  const { setAuthState } = React.useContext(AuthContext);
  const theme = useColorScheme();
  console.log('theme ', theme)
  return (
    <React.Fragment>
      <View style={{ flex: 1, flexDirection: 'column' }} >

        <LinearGradient start={{ x: 0.0, y: 0.4 }} end={{ x: 0.5, y: 1.0 }}
          location={[0, 1]} colors={[
            Colors[theme].backgroundDefaultAuth,
            Colors[theme].backgroundDefaultAuthSecond
          ]}
          style={{ flex: 1 }}
        >

          {/* Top Section */}
          <View style={{ flex: 2.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }} >
            <Image
              resizeMode='contain' style={{ width: wp('90%'), height: hp('90%') }}
              source={require('../assets/bank/crypto_bank.png')} />
          </View>

          {/* Button and text section */}
          <View style={{ flex: 2, justifyContent: 'center', paddingHorizontal: wp('5%') }} >
            <View style={{ position: 'relative', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.3)', height: hp('35%'), borderRadius: 15, paddingTop: 20, paddingHorizontal: wp('5%') }} >

              <Text style={{ fontFamily: 'Roboto-Black', fontSize: 25, color: '#fff', alignSelf: 'center', textAlign: 'center' }} >
                Comenzar
              </Text>

              <Text style={{ fontSize: 15, fontFamily: 'Roboto-Regular', alignSelf: 'center', paddingTop: 20, color: '#fff', textAlign: 'center' }} >
                puede revisar y hacer operaciones en su sistema muy fácil y confiable
              </Text>

              <MyButtonArt
                title="Iniciar Sesión"
                onPress={() => setAuthState("signIn")}
              />

            </View>
          </View>

        </LinearGradient>
      </View>
      {/* <MyText type="title" style={{ marginBottom: 35 }}>
        The new way of messaging
      </MyText>
      <MyButton title="Create account" onPress={() => setAuthState("signUp")} /> */}
      {/* <MyButton
        type="secondary"
        title="Login"
        onPress={() => setAuthState("signIn")}
      /> */}
      {/* <MyText
        type="caption"
        style={{ textAlign: "center", marginVertical: 12 }}
      >
        -Or-
      </MyText>
      <MyButton
        title="Sign In With Google"
        type="secondary"
        // onPress={() => Auth.federatedSignIn()}
      />
      <MyButton
        title="Sign In With Apple"
        type="secondary"
        // onPress={() => Auth.federatedSignIn()}
      /> */}
    </React.Fragment>
  );
}
