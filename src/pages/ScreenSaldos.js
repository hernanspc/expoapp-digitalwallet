import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenSaldos = () => {
  const navigation = useNavigation();
  useEffect(() => {
    async function checkFirstLaunch() {
      const firstLaunch = await AsyncStorage.getItem("@firstLaunch");
      if (firstLaunch === null) navigation.navigate("Onboarding");
    }
    checkFirstLaunch();
  }, []);

  return (
    <View>
      <Text>ScreenSaldos</Text>
    </View>
  )
}

export default ScreenSaldos

const styles = StyleSheet.create({})