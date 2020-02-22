import { GlobalState, GlobalStateActions } from '../types/types';

export default function globalStateReducer(state: GlobalState, action: GlobalStateActions) {
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
