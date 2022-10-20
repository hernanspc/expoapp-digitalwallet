import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
    Alert, Dimensions, ScrollView, TouchableOpacity, Button, useColorScheme
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { Avatar, Switch } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, TouchableRipple, useTheme } from "react-native-paper";
import { MoonIcon, useColorMode, useDisclose, Actionsheet, Divider, Icon, Text as TextBase } from "native-base";
import Colors from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toggle } from '@ui-kitten/components';
import { Audio } from 'expo-av';
import DialogMsg from "../components/commons/DialogMsg";
import { resetUser, setUser } from "../features/user";
import { deleteSession, saveStorage } from "../utils/user/userFunctions";
import Stories from "../components/Stories";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const { width, height } = Dimensions.get('window');
const Profile = (props) => {
    const { localSession, setLocalSession } = props;
    const colorMode = useColorScheme();

    const user = useSelector((state) => state.user);
    const [imgProfile, setImgProfile] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0SzrC4vDfJ0Fetb2uThB5Dp7UU4rCwq7QlQ&usqp=CAU")
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const [sound, setSound] = React.useState();

    const checkSessionLaunch = async () => {
        const objSession = await AsyncStorage.getItem("@saveSession");
        if (objSession === null) {
            return;
        } else {
            setLocalSession(true);
        }
    };

    useEffect(() => {
        checkSessionLaunch();
    }, []);

    async function playSoundOff() {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/switch-off.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    }

    async function playSoundOn() {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/switch-on.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    useEffect(() => {
        // const getPhoto = async () => {
        //     const photo = await AsyncStorage.getItem("@pic");
        //     if (photo !== null) {
        //         setImgProfile(photo);
        //     }
        // }
        // getPhoto();
        handleSwitch();
    }, [localSession]);

    const handleSwitch = async () => {
        if (localSession) {
            try {
                const data = {
                    empresa: user.EMPRESA,
                    usuario: user.USUARIO,
                    clave: user.PASSWORD,
                };
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem("@saveSession", jsonValue);
            } catch (e) {
                console.log("saveStorage ", e.message);
            }
        } else {
            try {
                await AsyncStorage.removeItem("@saveSession");
            } catch (e) {
                console.log("error deleteSession: ", e.message);
            }
        }
    };

    const onCheckedChange = (isChecked) => setLocalSession(isChecked);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const onCloseDialog = () => setIsOpenDialog(false);
    const cancelRef = React.useRef(null);
    const dispatch = useDispatch();

    const handleExitApp = () => {
        dispatch(
            resetUser()
        )
    }

    const pickImage = async () => {
        console.log('pickImage ')
        // crear un objeto
        const addToFirebase = {
            userId: 2,
            userName: "admin",
            device: "Android",
            createdAt: new Date()
        };

        try {
            const docRef = await addDoc(collection(db, "token"), addToFirebase);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return (
        <View style={{ flex: 1 }}>
            <DialogMsg
                isOpen={isOpenDialog} onClose={onCloseDialog} isError={true}
                btnSecondary={true}
                cancelRef={cancelRef}
                onConfirm={handleExitApp}
                title={"Cerrar Sessión"}
                description={"Esta seguro que realmente desea salir?"}
                textBtnPrimary={"Salir"}
                textBtnSecondary={"Cancelar"}
            />

            <ImageBackground style={{ paddingTop: 30 }} source={require("../../src/assets/background/costa_verde.jpg")} >
                <View style={styles.perfileInfo}>
                    <View style={styles.constainerAvatar}>
                        <Stories onOpen={pickImage} imgProfile={imgProfile} />
                        <View>
                            <Text style={styles.textUserInfo}>
                                {user?.APELLIDOS_Y_NOMBRES.toLowerCase().replace(/\w\S*/g, (w) =>
                                    w.replace(/^\w/, (c) => c.toUpperCase())
                                )}
                            </Text>
                            <View style={styles.textTiend}>
                                <MaterialCommunityIcons name="office-building-marker-outline" size={15}
                                    style={{ color: "#FFF", marginRight: 5, }} />
                                <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
                                    {user?.NOM_TIENDA.toLowerCase().replace(/\w\S*/g, (w) =>
                                        w.replace(/^\w/, (c) => c.toUpperCase())
                                    )}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ImageBackground>

            <ScrollView>
                <Drawer.Section
                    title={
                        <Text style={{ color: Colors[colorMode].textMenu, fontWeight: "bold" }}>Menú</Text>
                    }
                >
                    {/* <Drawer.Item
                    label="First Item"
                    active={active === 'first'}
                    onPress={() => setActive('first')}
                /> */}

                    <DrawerItemList  {...props} />
                </Drawer.Section>

                <Drawer.Section
                    title={
                        <Text style={{ color: Colors[colorMode].textMenu, fontWeight: "bold" }}>Preferencias</Text>
                    }
                >
                    <View style={stylesDrawer.preferencesStyles}>
                        <Text style={{ fontWeight: "500", color: Colors[colorMode].text }}>
                            {"Guardar sessión"}{"  "}
                            <FontAwesome
                                name="circle"
                                size={15}
                                color={Colors[localSession].sessionColor}
                            />
                        </Text>
                        <Toggle
                            status='success'
                            checked={localSession}
                            onChange={onCheckedChange}
                        >
                        </Toggle>
                    </View>

                    <View style={stylesDrawer.preferencesStyles}>
                        <Text style={{ fontWeight: "500", color: Colors[colorMode].text }}>
                            {colorMode === "dark" ? "Modo Claro" : "Modo Oscuro"}
                        </Text>
                        <TouchableOpacity
                            onPress={async () => {
                                if (colorMode === "dark") {
                                    // await toggleColorMode();
                                    playSoundOn();
                                } else {
                                    // await toggleColorMode();
                                    playSoundOff();
                                }
                            }}
                        >
                            {colorMode === "dark" ?
                                <Entypo name="light-up" size={24} color={Colors.icons.sol} />
                                // <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color={COLORS.icons.sol} />
                                :
                                // <Entypo name="moon" size={24} color={Colors.icons.sol} />
                                <MoonIcon size="6"
                                    color={Colors.icons.sol}
                                // color="#000"
                                />
                            }
                        </TouchableOpacity>
                    </View>

                </Drawer.Section>

            </ScrollView>
            <DrawerItem
                icon={({ focused, color, size }) => (
                    <MaterialCommunityIcons name="exit-run" size={24} color={Colors[colorMode].tintItems} />
                )}
                label={"Cerrar Sessión"}
                labelStyle={{ fontWeight: "500", color: Colors[colorMode].text }}
                onPress={() => setIsOpenDialog(!isOpenDialog)}
            />
            <View style={styles.bottomContainer}>
                <Text style={[styles.appName, { color: Colors[colorMode].textCredits }]}>Remesas Management</Text>
                <Text style={[styles.versionText, { color: Colors[colorMode].textCredits }]}>Version 1.0.1</Text>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    perfileInfo: {
        height: height / 5, justifyContent: 'flex-end',
        padding: 15,
    },
    constainerAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textTiend: {
        marginTop: 5, marginBottom: 5, flexDirection: 'row',
        alignItems: 'center',
    },

    viewUserInfo: {
        marginBottom: 40,
        flexDirection: 'row',
        paddingTop: 15,
    },
    textUserInfo: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 5,
    },
    userInfoAvatar: {
        marginRight: 20,
    },
    preferencesStyles: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    bottomContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    appName: {
        fontSize: 12,
        fontWeight: "bold",
    },
    versionText: {
        fontSize: 10,
        fontWeight: "500",
    },
});

const stylesDrawer = StyleSheet.create({
    preferencesStyles: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    sectionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
    },
    textPreferences: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 12,
        fontWeight: "bold",
        color: true ? "#5bc500" : "#EABE3F",
    }
});