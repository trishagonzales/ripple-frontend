export interface User {
  _id: string;
  email: string;
  profile: ProfileType;
  posts?: Post[];
  likedPosts?: Post[];
}

export interface ProfileType {
  _id?: string;
  avatar?: string;
  firstName: string;
  lastName: string;
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
    profile: {
      avatar?: Blob | string;
      firstName: string;
      lastName: string;
    };
  };
  dateCreated: string;
  lastModified?: string;
  likes: string[];
}
