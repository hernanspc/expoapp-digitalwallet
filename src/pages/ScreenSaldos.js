import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { ActionCenter, Header, ProfitIndicator } from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { COLORS, icons, SIZES } from '../../constants';
import MenuRight from '../assets/svg/Icons/menu-right';
import { API_BASE_URL, EMPRESA_APK } from '../utils/constants';
import { apis } from '../utils/const';
import { useSelector } from 'react-redux';
import CardItem from '../components/CardItem';
import Ionicons from 'react-native-vector-icons/Ionicons'
import wallet from '../assets/images/walletimg.png';
import etherium from '../assets/images/etherium.png';
import bitcoin from '../assets/images/bitcoin.png';
import { WalletCoinCard } from '../components/WalletCoinCard';
import { CoinCard } from '../components/CoinCard';
import { FlatList } from 'native-base';
import Card from '../components/Card';

const SectionTop = ({ operations }) => {

  const BadgeData = [
    {
      id: 1,
      background: "#3EBD3B",
      title: operations
        ? operations[0]?.CANT_TRANS_TRANSFERIDO
        : null,
      // text: 'Transferido'
    },
    {
      id: 2,
      background: "#ECDA23",
      title: operations ? operations[0]?.CANT_TRANS_PEND : null,
      // text: 'Trans Peniente'
    },
    {
      id: 3,
      background: "#B695C0",
      title: operations ? operations[0]?.CANT_TRANS_DIST : null,
      // text: 'Distribuida'
    },
    {
      id: 4,
      background: "#FF0000",
      title: operations ? operations[0]?.DEP_PENDIENTE : null,
      // text: 'Pendiente'
    },
  ];

  return (
    <>
      {BadgeData.map((item, index) => {
        return (
          <ActionCenter key={item.id} backgroundColor={item.background} value={item.title} img_text={item.text} />
        )
      })}
    </>
  )
}

const ScreenSaldos = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [saldos, setSaldos] = useState([])
  const [operations, setOperations] = useState([])

  const navigation = useNavigation();
  const user = useSelector((state) => state.user)

  const cargarDatosMenu = async () => {
    const postBody = {
      empresa: EMPRESA_APK,
      fechaIni: "",
      fechaFin: "",
      idTienda: user?.ID_TIENDA,
      idUsuario: user?.ID,
    };

    setLoadingData(true);
    await fetch(API_BASE_URL + apis.TSP_CARGAR_DATOS_MENU_TRANSFERIDOR, {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        setLoadingData(false);
        console.error("error TSP_CARGAR_DATOS_MENU_TRANSFERIDOR:", error);
      })
      .then((response) => {
        // console.log("✨ TSP_CARGAR_DATOS_MENU_TRANSFERIDOR ", response);
        setLoadingData(false);
        setSaldos(response.Table1);
        setOperations(response.Table)
      });
  };

  useEffect(() => {
    async function checkFirstLaunch() {
      const firstLaunch = await AsyncStorage.getItem("@firstLaunch");
      if (firstLaunch === null) navigation.navigate("Onboarding");
    }
    // navigation.navigate("Onboarding");
    checkFirstLaunch();
    cargarDatosMenu();
  }, []);

  const CRYPTOCURRENCIES = [
    {
      id: 1,
      name: "Bitcoin",
      cryptobalance: "3.5290123123 BTC",
      actualbalance: "$19.53",
      percentage: "+ 4.32%",
      difference: "$ 5.44",
      decreased: false,
      imgsrc: bitcoin
    },
    {
      id: 2,
      name: "Etherium",
      cryptobalance: "12.5290123123 ETH",
      actualbalance: "$19.53",
      percentage: "+ 4.32%",
      decreased: false,
      difference: "$ 3.44",
      imgsrc: etherium
    },
    {
      id: 3,
      name: "Ripple",
      cryptobalance: "3.5290123123 XRP",
      actualbalance: "$19.53",
      percentage: "- 4.32%",
      decreased: true,
      difference: "$ 7.44",
      imgsrc: wallet
    },
    {
      id: 4,
      name: "Ripple",
      cryptobalance: "3.5290123123 XRP",
      actualbalance: "$19.53",
      percentage: "- 4.32%",
      decreased: true,
      difference: "$ 7.44",
      imgsrc: bitcoin
    }
    ,
    {
      id: 5,
      name: "Ripple",
      cryptobalance: "3.5290123123 XRP",
      actualbalance: "$19.53",
      percentage: "- 4.32%",
      decreased: true,
      difference: "$ 7.44",
      imgsrc: etherium
    }
    ,
    {
      id: 6,
      name: "Ripple",
      cryptobalance: "3.5290123123 XRP",
      actualbalance: "$19.53",
      percentage: "- 4.32%",
      decreased: true,
      difference: "$ 7.44",
      imgsrc: wallet
    }
  ];


  return (
    <View style={{ flex: 1 }} >
      {/* Header */}
      <LinearGradient start={{ x: 0.0, y: 0.4 }} end={{ x: 0.5, y: 1.0 }} location={[0, 1]} colors={['#2D97DA', '#2249D6']} style={{ flex: 1.2, flexDirection: 'column' }} >
        <Header
          containerStyle={{
            height: 50,
            paddingHorizontal: SIZES.padding,
            marginTop: 35,
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
                borderWidth: 2,
                borderColor: COLORS.white,
                // backgroundColor: 'red',
                // padding: 20,
                borderRadius: SIZES.radius,
              }}
              onPress={() => navigation.openDrawer()}
            >
              {/* <Image source={icons.menu} /> */}
              <MenuRight />
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
        <View style={{ flexDirection: 'column', marginTop: hp('1%'), paddingHorizontal: '5%' }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }} >
            <View style={{ flexDirection: 'column' }} >
              <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#fff' }} >Bienvenido de nuevo</Text>
              <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 22 }} >{user ? user?.APELLIDOS_Y_NOMBRES : ''}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Image source={{ uri: 'https://lh3.googleusercontent.com/a/ALm5wu1oHfVK-BQwHbTMZKJpvkWv0D2XgfQTLB_EaVEO=s192-c-rg-br100' }} resizeMode='cover' style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 15 }} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }} >
            <View style={{ flexDirection: 'column' }} >
              <Text style={{ color: '#fff', fontSize: 28, fontFamily: 'Roboto-Bold' }} >$32,7456.68</Text>
            </View>
            <ProfitIndicator type="I" percentage_change={20} />
          </View>
        </View>
        {/* <WalletCoinCard item={{ name: "Total Wallet Balance", cryptobalance: "$39.584", imgsrc: wallet }} /> */}
      </LinearGradient>

      <View style={{
        flex: 2.6,
        backgroundColor: '#F5F8FF',
        paddingHorizontal: wp('2%')
      }} >
        <View style={{
          flexDirection: 'row',
          // backgroundColor: 'pink',
          paddingTop: 10,
          height: 60,
          height: 50,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'transparent',
          // borderColor: 'rgba(255,255,255,0.1)',
          elevation: 10,
          shadowColor: '#000',
          shadowRadius: 10,
          // marginTop: -25
          marginTop: -25
        }} >
          <SectionTop operations={operations} />
        </View>

        <View style={{
          marginTop: 10,
          backgroundColor: "#F5F8FF",
          overflow: "hidden",
          paddingBottom: 20
        }}>
          <FlatList
            data={saldos}
            // style={{ height: (Dimensions.get('window').height / 2) - 10 }}
            ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }}></View>}
            renderItem={({ item }) => <CoinCard item={item} onPress={() => { }} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>

    // <View style={{ height: "100%", backgroundColor: '#F5F8FF' }}>
    //   <View style={styles.headerbar}>
    //     <TouchableOpacity>
    //       <View>
    //         <View style={{ color: "#ADB7C3", width: 20, height: 3, marginVertical: 5, backgroundColor: "#ADB7C3" }}></View>
    //         <View style={{ color: "#ADB7C3", width: 15, height: 3, backgroundColor: "#ADB7C3" }}></View>
    //         <View style={{ color: "#ADB7C3", width: 10, height: 3, marginVertical: 5, backgroundColor: "#ADB7C3" }}></View>
    //       </View>
    //     </TouchableOpacity>
    //     <Text style={{ fontSize: 25, fontWeight: "500", color: "#4E5B69" }}>Wallets</Text>
    //     <TouchableOpacity><Ionicons name="wallet" size={26} color={"#ADB7C3"} /></TouchableOpacity>
    //   </View>

    //   <View style={{ marginHorizontal: 20 }}>
    //     <View>
    //       <WalletCoinCard item={{ name: "Total Wallet Balance", cryptobalance: "$39.584", imgsrc: wallet }} />
    //       <View style={styles.filters}>
    //         <Text style={{ color: "#ADB7C3" }}>Sorted by higher %</Text>
    //         <View style={{ flexDirection: "row", alignItems: "center" }}>
    //           <Text style={{ color: "#ADB7C3" }}>24 H</Text>
    //           <Ionicons name="chevron-down-outline" size={18} color={"#ADB7C3"} />
    //         </View>
    //       </View>
    //     </View>
    //     <View style={{ paddingVertical: 5, }}>
    //       <Card />
    //     </View>

    //     <View style={{
    //       marginTop: 10,
    //       backgroundColor: "#F5F8FF",
    //       overflow: "hidden",
    //       marginBottom: 10
    //     }}>
    //       <FlatList
    //         data={CRYPTOCURRENCIES}
    //         style={{ height: (Dimensions.get('window').height / 2) - 10 }}
    //         ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }}></View>}
    //         renderItem={({ item }) => <CoinCard item={item} onPress={() => nav.navigate("walletdetails", item)} />}
    //         keyExtractor={(item) => item.id}
    //         showsVerticalScrollIndicator={false}
    //       />
    //     </View>
    //   </View>

    // </View>
  )
}

export default ScreenSaldos

const styles = StyleSheet.create({
  headerbar: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  filters: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: "space-between"
  },
})