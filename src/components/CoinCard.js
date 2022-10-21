import { useColorMode } from 'native-base';
import * as React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { colorsMovistar } from '../../constants/colors';
import { capitalizarPrimeraLetra, milliFormat } from '../utils/functions';
import { CustomCard } from './CustomCard';

export const CoinCard = (props) => {
  // console.log('props ', props)
  // let { name, cryptobalance, actualbalance, decreased, percentage, difference, imgsrc } = props.item;
  let { NOMBRE_CUENTA, SALDO, DESC_MONEDA, BANCO_ID } = props.item;
  const is_negative = typeof SALDO === "number" && SALDO < 0;

  const miliformat = milliFormat(SALDO);

  let firstPart = miliformat.substring(0, miliformat.toString().length - 3);
  let secondPart = miliformat.substring(
    miliformat.toString().length - 3,
    miliformat.toString().length
  );

  const {
    colorMode,
  } = useColorMode();

  return (
    <Pressable onPress={props.onPress}>
      <CustomCard style={{
        flexDirection: "row", alignItems: "center",
        // backgroundColor: "#fff",
        backgroundColor: colorMode === 'dark' ? 'rgba(22,22,22,0.75)' : 'white',
        borderRadius: 15, paddingHorizontal: 10, paddingVertical: 20
      }}>
        <View>
          <Image style={{
            height: 60, width: 60, borderRadius: 30,
            backgroundColor: colorMode === 'dark' ? "#000" : '#F5F8FF',
          }} source={{ uri: `https://res.cloudinary.com/dd0myqhyb/image/upload/remesas/bancos/banco_${BANCO_ID}.jpg` }}></Image>
        </View>
        <View style={{ flex: 2, marginLeft: 15, marginRight: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
              {capitalizarPrimeraLetra(NOMBRE_CUENTA.toLowerCase())}
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
                {firstPart}
              </Text>
              <Text
                style={[
                  is_negative ? styles.text_warning : styles.text_primary,
                  {
                    fontSize: 14,
                  },
                ]}
              >
                {secondPart} {DESC_MONEDA}
              </Text>
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "space-between" }}>
            <Text style={{ color: "#ADB7C3", fontWeight: "600" }}>{SALDO}</Text>
            <Text style={{ color: SALDO ? "#EE225D" : "#2DB572", fontWeight: "600" }}>{SALDO}</Text>
          </View> */}
        </View>
      </CustomCard>
    </Pressable>);
}

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