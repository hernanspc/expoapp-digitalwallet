import { Alert, Linking } from 'react-native'

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