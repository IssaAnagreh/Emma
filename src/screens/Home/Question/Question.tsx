import React, {
  useContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {View, StyleSheet, Platform, TextInput} from "react-native";

import ThemeContext from "../../../lib/contexts/ThemeContext";
import AppText from "../../../components/AppText/AppText";
import LocalizationContext from "../../../lib/contexts/LocalizationContext";
import Choice from "./Choice/Choice";
import {QUESTION} from "../Home";

interface PROPS {
  question: QUESTION;
  error: boolean;
  changeError: (boo: boolean) => void;
}

export default forwardRef(function Question(
  {question, error, changeError}: PROPS,
  ref: any,
) {
  // stop component from being rendered if question is received yet
  if (!question) return null;

  // modularized theme
  const {colors, isDark} = useContext(ThemeContext);
  // modularized languages in src/lib/locales/[locale].ts
  const {t} = useContext(LocalizationContext);

  // states
  // if multiple answers question
  const [chosenOption, setChosenOption] = useState<string | undefined>(
    undefined,
  );
  // if assay question
  const [input, setInput] = useState<string | undefined>(undefined) as any;

  // the map item's render, if the question is multiple choice
  const handleRenderChoice = (choice: string) => {
    if (!choice) return null;
    const isChosen: boolean = chosenOption === choice;
    return (
      <Choice
        key={choice}
        isChosen={isChosen}
        choice={choice}
        setChosenOption={setChosenOption}
      />
    );
  };

  // forwardRef's contents
  useImperativeHandle(
    ref,
    () => ({
      // answer can be an option from multiple options or a text input
      answer: input ?? chosenOption,
      question,
    }),
    [input, chosenOption, question],
  );

  // choose the first option of the multiple options if available
  useEffect(() => {
    if (!question?.isMultipleChoice) return;
    setChosenOption(question.choices[0]);
  }, [question?.isMultipleChoice]);

  // change the question error value if it is empty and highlighted after adding anything to the text input
  useEffect(() => {
    if (!error) return;
    changeError(!input);
  }, [input, error]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? colors.primary : colors.secondary},
      ]}>
      {/* Abstract text module */}
      <AppText medium style={[{color: isDark ? colors.light : colors.dark}]}>
        {question.text}?
      </AppText>
      {/* if question is multiple choice then map the choices */}
      {question?.isMultipleChoice &&
        question?.choices?.map((choice: any) => handleRenderChoice(choice))}

      {/* if question is not multiple choice then show text input field */}
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

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12.5,
    ...Elevation(3, 3, 0, 4, 0.75, "black"),
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
