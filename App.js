import React, {useState, useEffect, useCallback} from 'react';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import {enableScreens} from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyNavigation, MyStartNavigation} from "./Naviagtions/MyNavigation";
import TabBarProvider from "./context/TabBarProvider";

import { NavigationContainer} from '@react-navigation/native';
// In theory you don't have to install `react-native-root-siblings` because it's a dep of root-toast
// But you can install it explicitly if your editor complains about it.
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider} from 'react-redux';
import * as Notifications from 'expo-notifications';
// Add
import { PersistGate } from 'redux-persist/integration/react';
import { Entypo } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import {persistor, store} from "./redux/store";
import {StatusBar, View} from "react-native";
enableScreens()



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});



const fetchFonts = () => {
    return Font.loadAsync({
        'Gordita-Black': require('./assets/fonts/Gordita-Black.otf'),
        'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Gordita-bold': require('./assets/fonts/Gordita-Bold.otf'),
        'Gordita': require('./assets/fonts/Gordita-Regular.otf'),
        'Gordita-medium': require('./assets/fonts/Gordita-Medium.otf'),
        'Gordita-ultra': require('./assets/fonts/Gordita-Ultra.otf'),
    });
};




const App = (props)  =>{
    StatusBar.setBarStyle("light-content");
    const [fontLoaded, setFontLoaded] = useState(false);

    const [firstLaunch, setFirstLaunch] = useState(null);
  
    const [appIsReady, setAppIsReady] = useState(false);

    const [loaded] = useFonts({
        'Gordita-Black': require('./assets/fonts/Gordita-Black.otf'),
        'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Gordita-bold': require('./assets/fonts/Gordita-Bold.otf'),
        'Gordita': require('./assets/fonts/Gordita-Regular.otf'),
        'Gordita-medium': require('./assets/fonts/Gordita-Medium.otf'),
        'Gordita-ultra': require('./assets/fonts/Gordita-Ultra.otf'),
      });

    useEffect(() => {
      async function prepare() {
        try {
          // Keep the splash screen visible while we fetch resources
          await SplashScreen.preventAutoHideAsync();
          // Pre-load fonts, make any API calls you need to do here
          await Font.loadAsync(Entypo.font);
          await fetchFonts()
          // Artificially delay for two seconds to simulate a slow loading
          // experience. Please remove this if you copy and paste the code!
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.warn(e);
        } finally {
          // Tell the application to render
          setAppIsReady(true);
        }
      }
  
      prepare();
    }, []);
  
    const onLayoutRootView = useCallback(async () => {
      if (appIsReady) {
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync();
      }
    }, [appIsReady]);
  
   

  


    useEffect(() => {

        AsyncStorage.getItem('A_first_time_open').then((value) => {

            if (value === null) {
                setFirstLaunch(true);
                console.log(value)
            } else if (value === false) {
                console.log(value)
                setFirstLaunch(false);
            }
        }).catch((err) => {
            console.log('Error @A_first_time_open: ', err);
        })
    }, []);

    if (!loaded) {
        return null;
      }
  
   
 




    return (
    
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer onLayout={onLayoutRootView}>
            {
                firstLaunch ?

                    <MyStartNavigation/>

                    :

                            <TabBarProvider>
                                <RootSiblingParent>
                                    <MyNavigation/>
                                </RootSiblingParent>


                            </TabBarProvider>



            }
        </NavigationContainer>
    </PersistGate>
</Provider>

    );
}



export default (App)

