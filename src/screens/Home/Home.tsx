import {View, StyleSheet, Dimensions} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import ThemeContext from "../../lib/contexts/ThemeContext";
import AppText from "../../components/AppText/AppText";
import AppButton from "../../components/AppButton/AppButton";
import LocalizationContext from "../../lib/contexts/LocalizationContext";
import Question from "./Question/Question";
import {FlatList} from "react-native-gesture-handler";
import {fetchQuestions, submitAnswers} from "../../lib/apis/questionsApi";
import {Screens} from "../../lib/constants";

const questionsExample = [
  {
    _id: 0,
    text: "What's your email",
    isMultipleChoice: false,
    choices: [],
    createdAt: new Date(),
  },
  {
    _id: 1,
    text: "What's your gender",
    isMultipleChoice: true,
    choices: ["Male", "Female"],
    createdAt: new Date(),
  },
];

export default function Home({navigation}: any) {
  const {isDark, colors} = useContext(ThemeContext);
  const {t} = useContext(LocalizationContext);
  const questionsRef = useRef([]) as any;
  const [questions, setQuestions] = useState(questionsExample) as any;

  const renderItem = ({item, index}: any) => (
    <Question
      ref={ref => (questionsRef.current[index] = ref)}
      question={item}
    />
  );

  const submit = () => {
    const answers = questionsRef?.current?.map((item: any) => ({
      answer: item.answer,
      questionId: item.question?._id,
    }));

    submitAnswers(answers)
      .then(() => {
        navigation.navigate(Screens.LANDING_PAGE);
      })
      .catch(error => {
        // TODO
      });
  };

  useEffect(() => {
    questionsRef.current = questionsRef.current.slice(0, questions.length);
  }, [questions]);

  useEffect(() => {
    fetchQuestions()
      .then(({data}: any) => setQuestions(data))
      .catch(error => {
        // TODO
      });
  }, []);

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[
        styles.container,
        {backgroundColor: isDark ? colors.dark : colors.light},
      ]}>
      <FlatList
        data={questions}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
        style={[
          styles.list,
          {
            backgroundColor: isDark ? colors.dark : colors.light,
          },
        ]}
        keyExtractor={item => `${item._id}`}
      />
      <AppButton style={styles.btn} onPress={submit}>
        <AppText
          bold
          style={[
            styles.btnTxt,
            {
              color: isDark ? colors.dark : colors.light,
            },
          ]}>
          {t("home.submit")}
        </AppText>
      </AppButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  list: {
    width: "100%",
  },
  listContentContainer: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
  },
  btn: {
    marginTop: 20,
    marginHorizontal: Dimensions.get("window").width * 0.1,
  },
  btnTxt: {
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
  },
});
