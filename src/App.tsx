import React from "react";
import {StatusBar, StyleSheet, useColorScheme} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {LoadingProvider} from "./lib/contexts/LoadingContext";
import {ThemeProvider} from "./lib/contexts/ThemeContext";
import {navigationRef} from "./lib/navigation/RootNavigation";
import {Provider} from "react-redux";
import {store} from "./store";
import {COLORS} from "./lib/constants";
import {RootNavigator} from "./lib/navigation/RootNavigator";
import {LocalizationProvider} from "./lib/contexts/LocalizationContext";

const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <LocalizationProvider>
        <Provider store={store}>
          <NavigationContainer
            ref={navigationRef}
            onStateChange={async () => {}}>
            <ThemeProvider>
              <LoadingProvider>
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
