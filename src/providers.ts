import React, { createContext } from 'react';
import { GlobalState, GlobalStateActions } from './reducers/global.reducer';

export interface GlobalContext {
  global: GlobalState;
  dispatch: React.Dispatch<GlobalStateActions>;
}

export const initialGlobal = {
  user: null,
  navMenu: false,
};

export const GlobalContext = createContext({} as GlobalContext);
export const GlobalProvider = GlobalContext.Provider;

export interface ModalContext {
  modal: React.ReactElement;
}

export const ModalContext = createContext({} as ModalContext);
export const ModalProvider = ModalContext.Provider;
