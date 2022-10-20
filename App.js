import * as React from "react";
import { useColorScheme } from "react-native";
import Splash from "./src/screens/Splash";
import AuthScreen from "./src/screens/Auth";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./src/app/store";
import { setNotificationHandler } from "expo-notifications";
import 'react-native-gesture-handler';
import RootMain from "./RootMain";
import { NativeBaseProvider, } from "native-base";
import { ApplicationProvider, IconRegistry, } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useFonts } from 'expo-font';

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Wrapper() {
  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-LightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'Roboto-Regular-Italic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf'),
    "Poppins-Black": require('./assets/fonts/Poppins-Black.ttf'),
    "Poppins-Bold": require('./assets/fonts/Poppins-Bold.ttf'),
    "Poppins-SemiBold": require('./assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Regular": require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <NativeBaseProvider>
          <App />
        </NativeBaseProvider>
      </ApplicationProvider>
    </Provider>
  );
}

function App() {


  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const colorScheme = useColorScheme();

  if (isLoading) return <Splash setIsLoading={setIsLoading} />;
  return user?.ID ? (
    <RootMain user={user} colorScheme={colorScheme} />
  ) : (
    <AuthScreen />
  );
}
