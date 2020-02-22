import React, { createContext } from 'react';
import { GlobalState, GlobalStateActions } from './types/types';

export interface Context {
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalStateActions>;
}

export const initialGlobalState = {
  user: 'q',
  navMenu: false
};

export const GlobalStateContext = createContext({} as Context);

export const GlobalStateProvider = GlobalStateContext.Provider;
