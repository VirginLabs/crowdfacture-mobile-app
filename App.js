import React, { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { enableScreens } from "react-native-screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyNavigation, MyStartNavigation } from "./Naviagtions/MyNavigation";
import TabBarProvider from "./context/TabBarProvider";

import { NavigationContainer } from "@react-navigation/native";
// In theory you don't have to install `react-native-root-siblings` because it's a dep of root-toast
// But you can install it explicitly if your editor complains about it.
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import * as Notifications from "expo-notifications";
// Add
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = (props) => {
  StatusBar.setBarStyle("light-content");
  const [fontLoaded, setFontLoaded] = useState(false);

  const [firstLaunch, setFirstLaunch] = useState(null);

  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded] = useFonts({
    "Gordita-Black": require("./assets/fonts/Gordita-Black.otf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Gordita-bold": require("./assets/fonts/Gordita-Bold.otf"),
    Gordita: require("./assets/fonts/Gordita-Regular.otf"),
    "Gordita-medium": require("./assets/fonts/Gordita-Medium.otf"),
    "Gordita-ultra": require("./assets/fonts/Gordita-Ultra.otf"),
  });

  const fetchFonts = async () => {
    await Font.loadAsync({
      "Gordita-Black": require("./assets/fonts/Gordita-Black.otf"),
      Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
      "Poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "Poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
      "Gordita-bold": require("./assets/fonts/Gordita-Bold.otf"),
      Gordita: require("./assets/fonts/Gordita-Regular.otf"),
      "Gordita-medium": require("./assets/fonts/Gordita-Medium.otf"),
      "Gordita-ultra": require("./assets/fonts/Gordita-Ultra.otf"),
    });
  };

  useEffect(() => {
    AsyncStorage.getItem("A_first_time_open")
      .then((value) => {
        if (value === null) {
          setFirstLaunch(true);
          console.log(value);
        } else if (value === false) {
          console.log(value);
          setFirstLaunch(false);
        }
      })
      .catch((err) => {
        console.log("Error @A_first_time_open: ", err);
      });
  }, []);

  if (!loaded) {
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => {
        setFontLoaded(true);
      }}
      onError={console.warn}
    />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {firstLaunch ? (
            <MyStartNavigation />
          ) : (
            <TabBarProvider>
              <RootSiblingParent>
                <MyNavigation />
              </RootSiblingParent>
            </TabBarProvider>
          )}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
