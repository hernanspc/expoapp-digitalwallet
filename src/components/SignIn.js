import * as React from "react";
import MyInput from "./MyInput";
import MyButton from "./MyButton";
import MyText from "./MyText";
import { Button, Pressable, View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import Colors from "../../constants/colors";
import { setUser } from "../features/user";
import { useDispatch } from "react-redux";
import { sendWhatsApp } from "../utils/functions";
import EyesClosed from "../assets/svg/Icons/eyesClosed";
import EyesOpen from "../assets/svg/Icons/eyesOpen";
import MyInputPass from "./MyInputPass";

export default function SignIn() {
  const { setAuthState, setEmail, setPassword, handleSignIn, isLoading } =
    React.useContext(AuthContext);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <MyText type="title" style={{ marginBottom: 30, fontFamily: 'Lobster-Regular', }}>
        Hola 👋🏻, Inicia Sesion
      </MyText>
      <MyInput label={"Usuario"} onChangeText={setEmail} />
      {/* <MyInput label={"Contraseña"} onChangeText={setPassword} secureTextEntry /> */}
      <MyInputPass label={"Contraseña"} onChangeText={setPassword} />

      <Pressable onPress={() => sendWhatsApp("+51945274831", "Por favor necesito una cuenta..")}>
        <MyText
          style={{
            color: Colors.light.tint,
            position: "absolute",
            right: 0,
            top: -15,
          }}
          type="caption"
        >
          Forgot Password?
        </MyText>
      </Pressable>
      <MyButton
        title={isLoading ? "Cargando..." : "Ingresar"}
        disabled={isLoading ? true : false}
        onPress={handleSignIn}
        type="primaryMovistar"
        style={{ marginTop: 20 }}
      />
      <MyButton
        title={"Regresar"}
        type="secondaryMovistar"
        onPress={() => setAuthState("default")}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});