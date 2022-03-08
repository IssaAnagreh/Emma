import React, {useEffect} from "react";
import {Platform} from "react-native";
import {useStore} from "react-redux";

import {request} from "../apis";

export const useApi = (props: any) => {
  // Redux's getState to extract the token from the AsyncStorage
  const {getState} = useStore();

  // unauthorized responses counter
  let unauthorized = 1;

  useEffect(() => {
    // axios request interceptor
    const requestInterceptor = request.interceptors.request.use(
      async (config: any) => {
        config.headers = {
          ...config.headers,
          // add authorization token
          Authorization: `Bearer ${getState().auth?.apiToken}`,
          // add operating system type (statistical reasons)
          "X-OS": Platform.OS,
        };
        return config;
      },
      function (error: any) {
        return Promise.reject(error);
      },
    );
    // axios response interceptor
    const responseInterceptor = request.interceptors.response.use(
      (response: any) => {
        // based on not having network tab in the console using the classic debugger
        // this will log all the succeeded responses with a blue color
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
          // this will log the unauthorized responses as error
          console.error("USE_API responseInterceptor 401 error:", {
            config: error.response?.config,
            ...error.response?.data,
          });

          // unauthorized responses counting
          unauthorized += 1;
          if (unauthorized >= 4) {
            console.info("%cUNAUTHORIZED", "color: red");
            // TO DO
            // sign out
          }
        }

        // log any kind of responses exceptions
        __DEV__ && console.info("%cERROR:", "color: red", error.response);
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
