import { ProfileType } from '../types/types';

export interface ProfileState {
  profile: ProfileType | undefined;
  editting: boolean;
  fileURL: string | undefined;
}

export interface ProfileActions {
  type: 'set-profile' | 'set-editting' | 'set-fileURL';
  profile?: ProfileType;
  fileURL?: string;
}

export default function profileReducer(state: ProfileState, action: ProfileActions) {
  switch (action.type) {
    case 'set-profile':
      return {
        ...state,
        profile: action.profile
      };

    case 'set-editting':
      return {
        ...state,
        editting: !state.editting
      };
    case 'set-fileURL':
      return {
        ...state,
        fileURL: action.fileURL
      };
  }
}
