export interface User {
  _id: string;
  email: string;
  profile: ProfileType;
  posts?: Post[];
  likedPosts?: Post[];
}

export interface ProfileType {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  age?: number;
  bio?: string;
  location?: string;
}

export interface Post {
  _id: string;
  image?: string;
  title: string;
  body: string;
  author: {
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
      avatar?: Blob | string;
    };
  };
  dateCreated: string;
  lastModified?: string;
  likes: string[];
}
