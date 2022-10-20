import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

import Ionicons from "react-native-vector-icons/Ionicons";

import ScreenSaldos from "../pages/ScreenSaldos";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import HeaderDrawer from "../components/commons/Header";

// import Movimiento from "../Screens/Movimiento";
// import ScreenIngreso from "../Screens/ScreenIngreso";
// import ScreenEgreso from "../Screens/ScreenEgreso";
// import PagoMovil from "../Screens/PagoMovil";
// import ConfirmedScreen from "../Screens/ConfirmedScreen";
// import ErrorTransaccion from "../Screens/ErrorTransaccion";
// import EditarIngreso from "../Screens/EditarIngreso";
// import EditarEgreso from "../Screens/EditarEgreso";

const Stack = createNativeStackNavigator();

export default function NavigatorSaldos() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#00A8E0",
        },
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Mis Saldos",
          headerLeft: () => <HeaderDrawer onPress={() => navigation.openDrawer()} />,
        }}
        name="Home"
        component={ScreenSaldos}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          title: "Onboarding",
          headerLeft: () => <HeaderDrawer onPress={() => navigation.openDrawer()} />,
        }}
        name="Onboarding"
        component={Onboarding}
      />
      {/* <Stack.Screen
        options={{ title: "Movimiento" }}
        name="SaldosDetail"
        component={Movimiento}
      />

      <Stack.Screen
        options={{ title: "Ingreso" }}
        name="ScreenIngreso"
        component={ScreenIngreso}
      />
      <Stack.Screen
        options={{ title: "Egreso" }}
        name="ScreenEgreso"
        component={ScreenEgreso}
      />
      <Stack.Screen
        options={{ title: "Pago Movil" }}
        name="PagoMovil"
        component={PagoMovil}
      />
      <Stack.Screen
        name="ConfirmedScreen"
        component={ConfirmedScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#fff", height: 0 },
        }}
      />
      <Stack.Screen
        name="ErrorTransaccion"
        component={ErrorTransaccion}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#fff", height: 0 },
        }}
      />
      <Stack.Screen
        name="EditarIngreso"
        component={EditarIngreso}
        options={{
          title: "Editar Ingreso",
        }}
      />
      <Stack.Screen
        name="EditarEgreso"
        component={EditarEgreso}
        options={{
          title: "Editar Egreso",
        }}
      /> */}
    </Stack.Navigator>
  );
}
