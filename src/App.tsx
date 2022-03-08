import React from "react";
import {StyleSheet} from "react-native";
import {NavigationContainer} from "@react-navigation/native";

import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";

import {LoadingProvider} from "./lib/contexts/LoadingContext";
import {ThemeProvider} from "./lib/contexts/ThemeContext";
import {navigationRef} from "./lib/navigation/navigatingMethods";
import {store} from "./store";
import {RootNavigator} from "./lib/navigation/RootNavigator";
import {LocalizationProvider} from "./lib/contexts/LocalizationContext";
import "moment/locale/ar";

const App = () => {
  return (
    // SafeArea lib which offers edges prop to decide which edge should be shifted
    <SafeAreaProvider style={styles.container}>
      {/* Localizing the project if multiple languages are going to be used */}
      <LocalizationProvider>
        {/* Redux provider */}
        <Provider store={store}>
          {/* React-Navigation provider */}
          <NavigationContainer ref={navigationRef}>
            {/* Theme modularizing context */}
            <ThemeProvider>
              {/* Loading modularizing context */}
              <LoadingProvider>
                {/* React-Navigation stacks, which contains all the screens */}
                <RootNavigator />
              </LoadingProvider>
            </ThemeProvider>
          </NavigationContainer>
        </Provider>
      </LocalizationProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
