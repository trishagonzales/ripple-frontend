export interface User {
  _id: string;
  email: string;
  profile: Profile;
  posts?: Post[];
  likedPosts?: Post[];
}

export interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  gender?: string;
  age?: number;
  bio?: string;
  location?: string;
}

export interface Post {
  _id: string;
  title: string;
  body: string;
  author: {
    profile: {
      firstName: string;
      lastName: string;
    };
  };
  dateCreated: string;
  lastModified?: string;
  likes: string[];
}

export interface GlobalState {
  user: null | User;
  navMenu: boolean;
}

export interface GlobalStateActions {
  type: 'toggle-navmenu' | 'login' | 'logout' | 'get-user-data';
  payload?: any;
}
