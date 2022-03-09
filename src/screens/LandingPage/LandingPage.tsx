import React, {useContext} from "react";
import {StyleSheet, Dimensions} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StackNavigationProp} from "@react-navigation/stack";
import {ParamListBase} from "@react-navigation/native";

import ThemeContext from "../../lib/contexts/ThemeContext";
import AppText from "../../components/AppText/AppText";
import AppButton from "../../components/AppButton/AppButton";
import LocalizationContext from "../../lib/contexts/LocalizationContext";
import {Screens} from "../../lib/constants";

type PROPS = {
  navigation: StackNavigationProp<ParamListBase>;
};

export default function LandingPage({navigation}: PROPS) {
  // modularized theme
  const {isDark, colors} = useContext(ThemeContext);
  // modularized languages in src/lib/locales/[locale].ts
  const {t} = useContext(LocalizationContext);

  // navigate user to the questions page (home)
  const handleNext = () => {
    navigation.navigate(Screens.HOME);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      {/* Abstract button module */}
      <AppButton activeOpacity={1} style={styles.hiddenBtn} />
      {/* Abstract text module */}
      <AppText bold style={styles.title} testID={"text"}>
        {t("landingPage.title") || "Welcome To Our Application"}
      </AppText>
      {/* navigate to the questions (home) screen */}
      <AppButton onPress={handleNext} style={styles.btn} testID={"nextButton"}>
        <AppText
          bold
          style={[
            styles.btnTxt,
            {
              color: isDark ? colors.dark : colors.light,
            },
          ]}>
          {t("landingPage.next")}
        </AppText>
      </AppButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Dimensions.get("window").width * 0.1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
  },
  hiddenBtn: {
    backgroundColor: "transparent",
  },
  btn: {
    marginTop: 20,
  },
  btnTxt: {
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
  },
});
