import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StackNavigationProp} from "@react-navigation/stack";
import {ParamListBase} from "@react-navigation/native";

import Question from "./Question/Question";
import ThemeContext from "../../lib/contexts/ThemeContext";
import AppText from "../../components/AppText/AppText";
import AppButton from "../../components/AppButton/AppButton";
import LocalizationContext from "../../lib/contexts/LocalizationContext";
import {fetchQuestions, submitAnswers} from "../../lib/apis/questionsApi";
import {Screens} from "../../lib/constants";

type PROPS = {
  navigation: StackNavigationProp<ParamListBase>;
};

export type QUESTION = {
  _id: string;
  text: string;
  choices: string[];
  isMultipleChoice: boolean;
};

export default function Home({navigation}: PROPS) {
  // modularized theme
  const {isDark, colors} = useContext(ThemeContext);
  // modularized languages in src/lib/locales/[locale].ts
  const {t} = useContext(LocalizationContext);

  // refs
  const questionsRef = useRef([]) as any;

  // states
  const [questions, setQuestions] = useState<QUESTION[]>([]);
  const [loader, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{[index: number]: boolean}>({});

  // handle flatList renderItem
  const renderItem = ({item, index}: any) => (
    <Question
      ref={ref => (questionsRef.current[index] = ref)}
      question={item}
      error={error[index]}
      changeError={(boo: boolean) =>
        setError((prev: any) => ({...prev, [index]: boo}))
      }
    />
  );

  // submit answers
  const submit = useCallback(() => {
    // UI/UX start submitting loading
    setLoading(true);

    // empty question occurs variable
    let error: boolean = false;

    // collect all answers from list's questions
    const answers: {
      answer: string;
      questionId: string;
    }[] = questionsRef?.current?.map((item: any, index: number) => {
      // highlight empty answers
      if (!item.answer) {
        setError((prev: any) => ({...(prev || {}), [index]: true}));
        error = true;
      }

      return {
        answer: item.answer,
        questionId: item.question?._id,
      };
    });

    // stop if empty question occurs
    // UI/UX finish submitting loading
    if (error) return setLoading(false);

    // post request
    submitAnswers(answers)
      .then(() => {
        // navigate back to the landing page
        navigation.navigate(Screens.LANDING_PAGE);
      })
      .catch(error => {
        // TODO
      })
      .finally(() => {
        // UI/UX finish submitting loading
        setLoading(false);
      });
  }, [questionsRef?.current]);

  // useEffect(() => {
  //   questionsRef.current = questionsRef.current.slice(0, questions.length);
  // }, [questions]);

  useEffect(() => {
    // fetch questions from the server-side and set them to the Questions state
    fetchQuestions()
      .then(({data}: any) => setQuestions(data))
      .catch(error => {
        // TODO
      });
  }, []);

  return (
    <SafeAreaView
      // shift the screen to safe area only from the bottom
      edges={["bottom"]}
      style={[
        styles.container,
        {backgroundColor: isDark ? colors.dark : colors.light},
      ]}>
      {/* questions list */}
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
      {/* submit answers Abstract button module */}
      {/* if questions are being submitted then disable and show a loader instead of the text */}
      <AppButton disabled={loader} style={styles.btn} onPress={submit}>
        {!loader ? (
          // Abstract text module
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
        ) : (
          <ActivityIndicator style={{width: "100%"}} />
        )}
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
    justifyContent: "center",
    alignItems: "center",
  },
});
