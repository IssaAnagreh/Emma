import React, {useEffect} from "react";

import {useApi} from "../hooks/useApi";
import AppNavigator from "./AppNavigator";

export const RootNavigator = () => {
  useApi(null);

  return <AppNavigator />;
};
