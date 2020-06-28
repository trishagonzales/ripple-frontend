export interface User {
  _id: string;
  email: string;
  profile: ProfileType;
  posts?: PostType[];
  likedPosts?: PostType[];
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

export interface PostType {
  _id: string;
  image?: string;
  title: string;
  body: string;
  author: AuthorType;
  dateCreated: string;
  lastModified?: string;
  likes: string[];
}

export interface AuthorType {
  _id: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: Blob | string;
  };
}