import React, {useContext} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";

import AppText from "../../../../components/AppText/AppText";
import ThemeContext from "../../../../lib/contexts/ThemeContext";

type PROPS = {
  setChosenOption: (choice: string) => void;
  choice: string;
  isChosen: boolean;
};

export default function Choice({setChosenOption, choice, isChosen}: PROPS) {
  // modularized theme
  const {colors, isDark} = useContext(ThemeContext);

  const handleChoicePress = () => setChosenOption(choice);

  return (
    <TouchableOpacity
      onPress={handleChoicePress}
      style={styles.choiceContainer}>
      {/* RadioButton outer circle */}
      <View
        style={[
          styles.radioContainer,
          {
            backgroundColor: colors.light,
            borderColor: !isDark ? colors.primary : colors.secondary,
          },
        ]}>
        {/* RadioButton inner circle */}
        <View
          style={
            isChosen
              ? [
                  styles.chosenRadio,
                  {
                    backgroundColor: !isDark
                      ? colors.primary
                      : colors.secondary,
                  },
                ]
              : []
          }
        />
      </View>
      {/* Abstract text module */}
      <AppText>{choice}</AppText>
    </TouchableOpacity>
  );
}

// radioSize is used multiple times
const radioSize: number = 20;
const styles = StyleSheet.create({
  choiceContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  radioContainer: {
    width: radioSize,
    height: radioSize,
    borderRadius: radioSize / 2,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  chosenRadio: {
    width: radioSize - 10,
    height: radioSize - 10,
    borderRadius: (radioSize - 10) / 2,
  },
});
