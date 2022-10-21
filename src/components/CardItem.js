import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomCard } from './CustomCard'

const CardItem = ({ onPress }) => {
    const is_negative = typeof 10 === "number" && 10 < 0;

    return (
        <Pressable onPress={onPress}>
            <CustomCard
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}
            >
                <View>
                    <Image style={{ height: 50, width: 50 }} source={{ uri: 'https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000' }}></Image>
                </View>
                <View style={{ flex: 2, marginLeft: 15, marginRight: 8 }}>
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <Text
                            style={{
                                fontWeight: "600",
                                fontSize: 18,
                                fontWeight: "normal",
                                fontStyle: "normal",
                                lineHeight: 24,
                                letterSpacing: 0,
                                color: "#1977F2",
                            }}
                        >
                            nombrecito
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={[
                                    is_negative ? styles.text_warning : styles.text_primary,
                                    {
                                        fontSize: 19,
                                    },
                                ]}
                            >
                                {/* {firstPart} */}
                                10
                            </Text>
                            <Text
                                style={[
                                    is_negative ? styles.text_warning : styles.text_primary,
                                    {
                                        fontSize: 14,
                                    },
                                ]}
                            >
                                {/* {secondPart} {DESC_MONEDA} */}
                                20
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 5,
                            justifyContent: "space-between",
                        }}
                    >
                        {/* <Text
              style={{ color: is_negative ? RED : GREEN, fontWeight: "600" }}
            >
              90
            </Text> */}
                        {/* <Text style={{ color: GREEN, fontWeight: "600" }}>500</Text> */}
                    </View>
                </View>

            </CustomCard>
            <View style={{ marginVertical: 12 }}></View>
        </Pressable>
    )
}

export default CardItem

const styles = StyleSheet.create({
    text_primary: {
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "right",
        color: "#1977F2",
    },
    text_warning: {
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "right",
        color: "#e9426d",
    },
});