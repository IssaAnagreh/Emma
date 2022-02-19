/**
 * @format
 */

import {AppRegistry, LogBox} from "react-native";
import App from "./src/App";
import {name as appName} from "./app.json";
import "react-native-gesture-handler";
import {enableScreens} from "react-native-screens";
LogBox.ignoreAllLogs(true);
enableScreens();

AppRegistry.registerComponent(appName, () => App);
