import { User } from '../types';

export interface GlobalState {
  user: null | User;
  navMenu: boolean;
}

export interface GlobalStateActions {
  type: 'toggle-navmenu' | 'login' | 'logout' | 'get-user-data' | 'update-email';
  payload?: any;
}

export default function globalReducer(state: GlobalState, action: GlobalStateActions) {
  switch (action.type) {
    case 'toggle-navmenu':
      return {
        ...state,
        navMenu: !state.navMenu,
      };

    case 'login':
      return {
        ...state,
        user: action.payload,
      };

    case 'logout':
      return {
        ...state,
        user: null,
      };

    case 'get-user-data':
      return {
        ...state,
        user: action.payload,
      };

    case 'update-email':
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
      };

    default:
      return state;
  }
}
