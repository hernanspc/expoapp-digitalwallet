import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfitIndicator } from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

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
    <View style={{ flex: 1 }} >
      <LinearGradient start={{ x: 0.0, y: 0.4 }} end={{ x: 0.5, y: 1.0 }} location={[0, 1]} colors={['#2D97DA', '#2249D6']} style={{ flex: 1.2, flexDirection: 'column' }} >
        <View style={{ flexDirection: 'column', marginTop: hp('10%'), paddingHorizontal: '5%' }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }} >
            {/* Welcome message and name */}
            <View style={{ flexDirection: 'column' }} >
              <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#fff' }} >Welcome Back</Text>
              <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 22 }} >Yaser</Text>
            </View>

            {/* Bell icon and profile pic */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <FontAwesome name='bell' size={30} color="#fff" />
              <Image source={{ uri: 'https://lh3.googleusercontent.com/a/ALm5wu1oHfVK-BQwHbTMZKJpvkWv0D2XgfQTLB_EaVEO=s192-c-rg-br100' }} resizeMode='cover' style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 15 }} />
            </View>
          </View>




          {/* amount  */}
          <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between', alignItems: 'center' }} >
            {/* Amount */}
            <View style={{ flexDirection: 'column' }} >
              <Text style={{ color: '#fff', fontSize: 28, fontFamily: 'Roboto-Bold' }} >$32,7456.68</Text>
              <Text style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Roboto-Regular-Italic', fontSize: 14 }} >Updated 2 mins ago</Text>
            </View>

            {/* profit loss indicator */}
            {/* profit loss indicator */}
            <ProfitIndicator type="I" percentage_change={100} />
          </View>
        </View>

      </LinearGradient>

    </View>
  )
}

export default ScreenSaldos

const styles = StyleSheet.create({})