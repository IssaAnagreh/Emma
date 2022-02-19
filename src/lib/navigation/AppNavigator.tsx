import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {Screens} from "../constants";
import HomeNavigator from "./HomeNavigator/HomeNavigator";

const AppStack = createStackNavigator();
const AppNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
      initialRouteName={Screens.HOME_NAVIGATOR}>
      <AppStack.Screen
        name={Screens.HOME_NAVIGATOR}
        component={HomeNavigator}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
