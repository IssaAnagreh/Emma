import {createRef} from 'react';
import {Screens} from '../constants';

export const navigationRef = createRef<any>();

export const rootNavigate = (name: String, params?: any) => {
  navigationRef.current?.navigate?.(name, params);
};

export const rootReset = () => {
  navigationRef.current?.reset?.();
};

export const rootReplace = (name: String, params?: any) => {
  navigationRef.current?.replace?.(name, params);
};

export const rootGoBack = () => {
  navigationRef.current?.goBack();
};
