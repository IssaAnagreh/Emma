import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {Screens} from "../../constants";
import Home from "../../../screens/Home/Home";
import LandingPage from "../../../screens/LandingPage/LandingPage";
import LocalizationContext from "../../contexts/LocalizationContext";
import ThemeContext from "../../contexts/ThemeContext";

const HomeStack = createStackNavigator();

export const HomeNavigator = ({route}: any) => {
  const {t} = useContext(LocalizationContext);
  const {colors} = useContext(ThemeContext);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name={Screens.LANDING_PAGE}
        component={LandingPage}
      />
      <HomeStack.Screen
        options={{
          headerLeftLabelVisible: false,
          title: t("home.title"),
          headerTintColor: colors.primary,
        }}
        name={Screens.HOME}
        component={Home}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
