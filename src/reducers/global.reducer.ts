import { User } from '../types/types';

export interface GlobalState {
  user: null | User;
  navMenu: boolean;
}

export interface GlobalStateActions {
  type: 'toggle-navmenu' | 'login' | 'logout' | 'get-user-data';
  payload?: any;
}

export default function globalReducer(state: GlobalState, action: GlobalStateActions) {
  switch (action.type) {
    case 'toggle-navmenu':
      return {
        ...state,
        navMenu: !state.navMenu
      };

    case 'login':
      return {
        ...state,
        user: action.payload
      };

    case 'logout':
      return {
        ...state,
        user: null
      };

    case 'get-user-data':
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
