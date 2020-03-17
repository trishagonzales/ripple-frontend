import React, { createContext } from 'react';
import { GlobalState, GlobalStateActions } from './reducers/global.reducer';

export interface Context {
  global: GlobalState;
  dispatch: React.Dispatch<GlobalStateActions>;
}

export const initialGlobal = {
  user: null,
  navMenu: false
};

export const GlobalContext = createContext({} as Context);

export const GlobalProvider = GlobalContext.Provider;
