import React, { createContext } from 'react';
import { User } from './types/types';

export interface UserProvider {
  user: User | null | undefined;
  dispatch: React.Dispatch<any>;
}

export const UserContext: React.Context<any> = createContext(null);
export const UserProvider: React.Provider<UserProvider> = UserContext.Provider;
