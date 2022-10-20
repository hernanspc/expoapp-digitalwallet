import React, { useEffect, useState } from "react";
import { View } from "../components/themed/Themed";
import MyText from "../components/MyText";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user";
import { setChatRooms } from "../features/chatRooms";
import { getUser } from "../graphql/queries";
import { getNotificationsByUserID } from "../utils/notifications";
import { setNotifications } from "../features/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL, EMPRESA_APK } from "../utils/constants";
import { apis } from "../utils/const";
import { asyncFetchApi } from "../utils/api";

export default function Splash({ setIsLoading }) {
  const dispatch = useDispatch();

  async function handleSignIn(body) {
    console.log('body ', body)
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "empresa": "REMESAS_JA_NEW",
          "usuario": "admin",
          "clave": body.clave
        })
      };
      fetch('https://sistemaremesas.azurewebsites.net/TSP_LOGIN', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data?.length > 0) {
            const obj = {
              ID: data[0].ID,
              APELLIDOS_Y_NOMBRES: data[0].APELLIDOS_Y_NOMBRES,
              USUARIO: data[0].USUARIO,
              ID_TIENDA: data[0].ID_TIENDA,
              NOM_TIENDA: data[0].NOM_TIENDA,
              TIPO_USUARIO: data[0].TIPO_USUARIO,
              ID_EMISOR: data[0].ID_EMISOR,
              ID_MONEDA: data[0].ID_MONEDA,
              PASSWORD: body.clave,
              EMPRESA: body.empresa,
            };
            dispatch(
              setUser(obj)
            )
            console.log('🤡 successfull: ', data)
          } else { return }
        }
        );
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  }

  const verifyData = async () => {
    console.log('verifyData.')
    try {
      const data = await AsyncStorage.getItem('@saveSession')
      if (data) {
        const body = {
          empresa: JSON.parse(data, 2, 2).empresa,
          usuario: JSON.parse(data, 2, 2).usuario,
          clave: JSON.parse(data, 2, 2).clave
        }
        handleSignIn(body);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    verifyData();

  }, [])


  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       const user = useSelector((state) => state.user);
  //       console.log('splash in.-. ', user);


  //       // const { attributes } = await Auth.currentAuthenticatedUser();
  //       // const { data } = await API.graphql(
  //       //   graphqlOperation(getUser, { id: attributes.sub })
  //       // );
  //       // const { notificationsList } = await getNotificationsByUserID(
  //       //   attributes.sub
  //       // );
  //       // if (notificationsList) dispatch(setNotifications(notificationsList));
  //       // // console.log(data);
  //       // dispatch(
  //       //   setUser({
  //       //     id: attributes.sub,
  //       //     firstName: data.getUser.firstName,
  //       //     lastName: data.getUser.lastName,
  //       //     profilePicture: data.getUser.profilePicture,
  //       //     email: attributes.email.toLowerCase(),
  //       //     status: data.getUser.status,
  //       //     notificationToken: data.getUser.notificationToken,
  //       //     latitude: data.getUser.latitude,
  //       //     longitude: data.getUser.longitude,
  //       //   })
  //       // );
  //       // if (data.getUser.chatRooms.items !== null) {
  //       //   dispatch(setChatRooms(data.getUser.chatRooms.items));
  //       // }
  //       setIsLoading(false);
  //       // console.log(attributes);
  //     } catch (e) {
  //       console.log(e);
  //       setIsLoading(false);
  //     }
  //   })();
  // }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MyText type="title">🕰</MyText>
      <MyText type="title">Loading...</MyText>
    </View>
  );
}
