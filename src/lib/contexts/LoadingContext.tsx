import React, {createContext, ReactNode, useState} from "react";
import {View, StyleSheet, ActivityIndicator} from "react-native";

const LoadingContext = createContext({
  loading: false,
  setLoading: (value: boolean) => null,
});

export const LoadingConsumer = LoadingContext.Consumer;
export const LoadingProvider = (props: {children: ReactNode}) => {
  // is loading component visible
  const [isVisible, setIsVisible] = useState(false);
  // context method to be used in any component
  const setLoading = (visible: any) => setIsVisible(() => visible);

  return (
    //@ts-ignore
    <LoadingContext.Provider value={{loading: isVisible, setLoading}}>
      {/* children here is the rest of the application (check App.tsx ~ LoadingProvider) */}
      {props.children}
    </LoadingContext.Provider>
  );
};

export const LoadingComponent = () => (
  <LoadingConsumer>
    {/* Loading component (check line 33) will be shown whenever props.loading === true */}
    {(props: {loading: boolean}) => !!props.loading && <Loading />}
  </LoadingConsumer>
);

// Loading component
const Loading = ({children}: {children?: ReactNode}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
      {/* a text can be added here as an example */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
    zIndex: 999,
    backgroundColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
  },
});

export default LoadingContext;
