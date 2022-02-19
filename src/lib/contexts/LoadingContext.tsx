import React, {createContext, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingContext = createContext({
  loading: false,
  setLoading: (value: boolean) => null,
});
export const LoadingConsumer = LoadingContext.Consumer;
export const LoadingProvider = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const setLoading = (visible: any) => setIsVisible(() => visible);
  return (
    //@ts-ignore
    <LoadingContext.Provider value={{loading: isVisible, setLoading}}>
      {props.children}
    </LoadingContext.Provider>
  );
};
export const LoadingComponent = () => (
  <LoadingConsumer>
    {(props: any) => !!props.loading && <Loading />}
  </LoadingConsumer>
);
const Loading = ({children}: any) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
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
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
});

export default LoadingContext;
