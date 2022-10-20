import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

export const saveStorage = async () => {
    const user = useSelector((state) => state.user);
    console.log('...user ', user)
    try {
        const data = {
            empresa: user.EMPRESA,
            usuario: user.USUARIO,
            clave: user.PASSWORD,
        };
        console.log('saveSession: ', data)
        const jsonValue = await JSON.stringify(data);
        await AsyncStorage.setItem("@saveSession", jsonValue);
    } catch (e) {
        console.log("saveStorage ", e.message);
    }
}

export const deleteSession = async () => {
    try {
        await AsyncStorage.removeItem("@saveSession");
    } catch (e) {
        console.log("deleteSession: ", e.message);
    }
}