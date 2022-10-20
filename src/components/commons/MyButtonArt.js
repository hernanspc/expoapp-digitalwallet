import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import Colors from '../../../constants/colors';

const MyButtonArt = ({
    onPress,
    style,
    title,
    type = "primary",
    ...otherProps
}) => {
    const theme = useColorScheme();

    const buttonStyle =
        theme === "light" && type === "primary"
            ? styles.primaryLight :
            // theme === "dark" && type === "primary" ?
            //  styles.primaryDark:
            styles.primaryDark;;

    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle, style]}
            onPress={onPress}
            {...otherProps}
        >
            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#2D97DA' }} >{title}</Text>
        </TouchableOpacity>
    )
}

export default MyButtonArt

const styles = StyleSheet.create({
    button: {
        position: 'relative',
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    primaryLight: {
        backgroundColor: Colors.light.background,
    },
    primaryDark: {
        backgroundColor: Colors.dark.background,
    }
})