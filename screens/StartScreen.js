import React from "react";

import { StyleSheet, View } from "react-native";
import Onboarding from "../components/OnBoarding/OnBoarding";

const StartScreen = ({ navigation }) => {
  return (
    <View style={Styles.containerView}>
      <Onboarding navigation={navigation} />
    </View>
  );
};

const Styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartScreen;
