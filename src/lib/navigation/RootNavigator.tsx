import React from "react";

import {useApi} from "../hooks/useApi";
import AppNavigator from "./AppNavigator";

// main (first) app stack
export const RootNavigator = () => {
  // modularizing api requests and responses interceptors.
  useApi(null);

  return <AppNavigator />;
};
