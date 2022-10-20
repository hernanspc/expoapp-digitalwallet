import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { ActionCenter, Header, ProfitIndicator } from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { COLORS, icons, SIZES } from '../../constants';

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
      {/* Header */}
      <LinearGradient start={{ x: 0.0, y: 0.4 }} end={{ x: 0.5, y: 1.0 }} location={[0, 1]} colors={['#2D97DA', '#2249D6']} style={{ flex: 1.2, flexDirection: 'column' }} >
        <Header
          containerStyle={{
            height: 50,
            paddingHorizontal: SIZES.padding,
            marginTop: 40,
            alignItems: 'center',
          }}
          title={''}
          leftComponent={
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: COLORS.white,
                // backgroundColor: 'white',
                borderRadius: SIZES.radius,
              }}
              onPress={() => navigation.openDrawer()}
            >
              <Image source={icons.menu} />
            </TouchableOpacity>
          }
        // rightComponent={
        //   <TouchableOpacity
        //     style={{
        //       borderRadius: SIZES.radius,
        //       alignItems: 'center',
        //       justifyContent: 'center',
        //     }}
        //   >
        //     <Image
        //       // source={dummyData.myProfile?.profile_image}
        //       source={{ uri: 'https://yt3.ggpht.com/vPYy-zeU9o6j98WyhS_r5HkMelB9vD--AwzUKB0Xd7Wcm5Qhza4iwOyS8fiGjawcNV3y17a8=s88-c-k-c0x00ffffff-no-rj-mo' }}
        //       style={{ width: 40, height: 40, borderRadius: SIZES.radius }}
        //     />

        //   </TouchableOpacity>
        // }
        />
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
            </View>

            {/* profit loss indicator */}
            {/* profit loss indicator */}
            <ProfitIndicator type="I" percentage_change={20} />
          </View>
        </View>

      </LinearGradient>

      <View style={{ flex: 2.5, backgroundColor: '#fff', paddingHorizontal: wp('5%') }} >
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', height: hp('13%'), width: '100%', alignItems: 'center', justifyContent: 'space-around', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', elevation: 10, shadowColor: '#000', shadowRadius: 10, marginTop: -25 }} >
          <ActionCenter img_src={require('../assets/icons/top-up.png')} img_text="Top-Up" />
          <ActionCenter img_src={require('../assets/icons/buy.png')} img_text="Buy" />
          <ActionCenter img_src={require('../assets/icons/withdraw.png')} img_text="WithDraw" />
        </View>

      </View>
    </View>
  )
}

export default ScreenSaldos

const styles = StyleSheet.create({})