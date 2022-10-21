import { Alert, Linking } from 'react-native'

export function capitalizarPrimeraLetra(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
}

export function milliFormat(num) {
    // Agregar miles
    let s;
    s = num?.toString();
    // if (/[^0-9\.]/.test(s)) return "invalid value";
    s = s?.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) {
        s = s.replace(re, "$1,$2");
    }
    s = s.replace(/,(\d\d)$/, ".$1");
    return s.replace(/^\./, "0.");
}

export const sendWhatsApp = (phoneNumber, text) => {
    const link = `https://wa.me/${phoneNumber}?text=${text}`
    Linking.canOpenURL(link).then((supported) => {
        if (!supported) {
            Alert.alert("Por favor instale WhatsApp para enviar un mensaje directo")
            return
        }
        return Linking.openURL(link)
    })
}