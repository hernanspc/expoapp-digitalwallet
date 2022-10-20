import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigatorSaldos from '../stack/NavigatorSaldos';

const Drawer = createDrawerNavigator();

export default function DrawerOne() {
    return (
        <>
            <Drawer.Screen
                options={{
                    title: "Mis Saldos",
                    // headerStyle: {
                    //     backgroundColor: "#742384",
                    // },
                    // headerTintColor: "white",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        color: "white",
                    },
                    drawerIcon: (config) => (
                        <MaterialIcons
                            name="account-balance-wallet"
                            size={20}
                            color="#0D85FB"
                        />
                    ),
                }}
                name="NavigatorSaldos"
                component={NavigatorSaldos}
            />
        </>
    )
}

const styles = StyleSheet.create({})