import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Badge } from "react-native-elements";

const ActionCenter = ({ img_src, img_text, backgroundColor, value }) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }} >
            {/* <Image style={{ height: 60, width: 60 }} source={img_src} /> */}
            <Badge
                badgeStyle={[
                    styles.badgeWrapper,
                    { backgroundColor: `${backgroundColor}` },
                ]}
                textStyle={{ fontSize: 17 }}
                value={value}
            />
            <Text style={{ fontSize: 15, fontFamily: 'Roboto-Bold', color: '#333' }} >{img_text}</Text>
        </TouchableOpacity>
    )
}

export default ActionCenter

const styles = StyleSheet.create({
    badgeWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
    }
})
