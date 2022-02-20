import React, {
  useContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {View, TouchableOpacity, StyleSheet, Platform} from "react-native";

import ThemeContext from "../../../lib/contexts/ThemeContext";
import AppText from "../../../components/AppText/AppText";
import {TextInput} from "react-native-gesture-handler";
import LocalizationContext from "../../../lib/contexts/LocalizationContext";

export interface QUESTION {
  text: string;
  type: boolean;
  choices: string[];
  isMultipleChoice: boolean;
}

export default forwardRef(function Question(
  {question, error, changeError}: any,
  ref: any,
) {
  if (!question) return null;

  const {colors, isDark} = useContext(ThemeContext);
  const {t} = useContext(LocalizationContext);
  const [chosenOption, setChosenOption] = useState(undefined) as any;
  const [input, setInput] = useState(undefined) as any;

  const handleRenderChoice = (choice: string) => {
    const isChosen = chosenOption === choice;
    return (
      <TouchableOpacity
        onPress={() => setChosenOption(choice)}
        key={choice}
        style={styles.choiceContainer}>
        <View
          style={[
            styles.radioContainer,
            {
              backgroundColor: colors.light,
              borderColor: !isDark ? colors.primary : colors.secondary,
            },
          ]}>
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
        <AppText>{choice}</AppText>
      </TouchableOpacity>
    );
  };

  useImperativeHandle(ref, () => ({
    answer: input ?? chosenOption,
    question,
  }));

  useEffect(() => {
    if (!question?.isMultipleChoice) return;
    setChosenOption(question.choices[0]);
  }, [question?.isMultipleChoice]);

  useEffect(() => {
    if (!error) return;
    changeError(!input);
  }, [input]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? colors.primary : colors.secondary},
      ]}>
      <AppText medium style={[{color: isDark ? colors.light : colors.dark}]}>
        {question.text}?
      </AppText>
      {question?.isMultipleChoice &&
        question?.choices?.map((choice: any) => handleRenderChoice(choice))}
      {!question?.isMultipleChoice && (
        <TextInput
          style={[
            styles.txtInput,
            {
              borderColor: error
                ? colors.red
                : !isDark
                ? colors.primary
                : colors.secondary,
            },
          ]}
          onChangeText={setInput}
          ref={ref}
          placeholder={t("home.inputPlaceHolder")}
        />
      )}
    </View>
  );
});

const Elevation = (
  value: number = 3,
  height: number = 2,
  width: number = 0,
  shadowRadius: number = 10,
  shadowOpacity: number = 0.4,
  shadowColor: string = "black",
) =>
  Platform.select({
    ios: {
      shadowOpacity,
      shadowRadius,
      shadowColor,
      shadowOffset: {height, width},
    },
    android: {
      elevation: value,
    },
  });

const radioSize = 20;
const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12.5,
    ...Elevation(3, 3, 0, 4, 0.75, "black"),
  },
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
  txtInput: {
    height: 35,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
