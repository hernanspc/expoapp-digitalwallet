import { StyleSheet, Text, View, TextInput, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colorsMovistar } from '../../constants/colors';
import Colors from '../../constants/colors'
import MyText from './MyText';
import EyesClosed from '../assets/svg/Icons/eyesClosed';
import EyesOpen from '../assets/svg/Icons/eyesOpen';
import { Audio } from 'expo-av';

export default function MyInputPass({
    label,
    value,
    onChangeText,
    hiddenLabel,
    secureTextEntry,
    ...props
}) {
    const theme = useColorScheme();

    const [inputBackgroundColor, setInputBackgroundColor] = useState(colorsMovistar.grey_1)
    const [showPassword, setShowPassword] = useState(true)

    const customOnFocus = () => {
        props?.onFocus;
        setInputBackgroundColor(colorsMovistar.android_bars_primary_primary)
    }

    const customOnBlur = () => {
        props?.onBlur;
        setInputBackgroundColor(colorsMovistar.grey_1)
    }

    const [sound, setSound] = React.useState();
    async function playSoundOff() {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/switch-off.mp3')
        );
        setSound(sound);

        console.log('Playing SoundOff');
        await sound.playAsync();
    }

    async function playSoundOn() {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/switch-on.mp3')
        );
        setSound(sound);
        console.log('Playing SoundOn');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            {!hiddenLabel && (
                <MyText style={{ fontWeight: "bold", marginBottom: 10, color: inputBackgroundColor }} type="caption">
                    {label}
                </MyText>
            )}
            <View style={{ justifyContent: 'center', }}>
                <TextInput
                    placeholder={label}
                    style={[styles.input, styles[theme], { borderColor: inputBackgroundColor }]}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={showPassword ? true : false}
                    onFocus={customOnFocus}
                    onBlur={customOnBlur}
                    selectionColor={theme === 'dark' ? colorsMovistar.android_bars_primary_primary : colorsMovistar.android_controls_tab_selected}
                />
                <TouchableOpacity style={styles.textBoxButton} onPress={() => {
                    setShowPassword(!showPassword)
                    playSoundOn();
                }}>
                    {showPassword ?
                        <EyesClosed color={inputBackgroundColor} size={"30"} />
                        :
                        <EyesOpen color={inputBackgroundColor} size={"30"} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    dark: {
        backgroundColor: Colors.dark.text + "06",
        borderColor: Colors.dark.text + "80",
        color: Colors.dark.text,
    },
    light: {
        backgroundColor: Colors.light.background + "06",
        borderColor: Colors.light.text + "80",
        color: Colors.light.text,
    },
    input: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        paddingLeft: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    textBoxButton: {
        position: 'absolute',
        right: 20,
        zIndex: 100,
        width: 20,
        height: 20,
        // borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})