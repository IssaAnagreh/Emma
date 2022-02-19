import React, {useEffect} from "react";
import {Platform} from "react-native";
import {useStore} from "react-redux";

import {request} from "../apis";

export const useApi = (props: any) => {
  const {getState} = useStore();
  let unauthorized = 1;
  useEffect(() => {
    const requestInterceptor = request.interceptors.request.use(
      async (config: any) => {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${getState().auth?.apiToken}`,
          "X-OS": Platform.OS,
        };
        return config;
      },
      function (error: any) {
        return Promise.reject(error);
      },
    );
    const responseInterceptor = request.interceptors.response.use(
      (response: any) => {
        __DEV__ &&
          console.info("%cAPI hit:", "color: blue", {
            ...response,
            url: response?.config?.url,
            token: response?.config?.headers?.Authorization?.slice(7),
          });
        return Promise.resolve(response.data);
      },
      async (error: any) => {
        if (error.response && error.response.status === 401) {
          console.error("USE_API responseInterceptor 401 error:", {
            config: error.response?.config,
            ...error.response?.data,
          });

          // Redirect / handling failed refresh token response
          unauthorized += 1;
          if (unauthorized >= 4) {
            console.error("SIGN_OUT");
            // TO DO
            // signout
          }
        }
        __DEV__ && console.error("useApi", error);
        return Promise.reject(error);
      },
    );
    return () => {
      request.interceptors.request.eject(requestInterceptor);
      request.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  return null;
};
