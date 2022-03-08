import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {Screens} from "../constants";
import HomeNavigator from "./HomeNavigator/HomeNavigator";

const AppStack = createStackNavigator();

/*
 this navigator has only one screen (home)
 it can have more main screens
*/
const AppNavigator = () => {
  return (
    <AppStack.Navigator
      // hide stack's header (if header is needed use a stack instead of a component in screens)
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}>
      <AppStack.Screen
        // screens are modularized so they can be reused from all the files of the app
        name={Screens.HOME_NAVIGATOR}
        component={HomeNavigator}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
