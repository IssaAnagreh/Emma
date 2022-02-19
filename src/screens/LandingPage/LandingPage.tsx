import {View, StyleSheet, Dimensions} from "react-native";
import React, {useContext} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import ThemeContext from "../../lib/contexts/ThemeContext";
import AppText from "../../components/AppText/AppText";
import AppButton from "../../components/AppButton/AppButton";
import LocalizationContext from "../../lib/contexts/LocalizationContext";
import {Screens} from "../../lib/constants";

export default function LandingPage({navigation}: any) {
  const {isDark, colors} = useContext(ThemeContext);
  const {t} = useContext(LocalizationContext);

  const handleNext = () => {
    navigation.navigate(Screens.HOME);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <AppButton activeOpacity={1} style={styles.hiddenBtn} />
      <AppText bold style={styles.title}>
        {t("landingPage.title")}
      </AppText>
      <AppButton onPress={handleNext} style={styles.btn}>
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
    padding: Dimensions.get("window").width * 0.1,
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
