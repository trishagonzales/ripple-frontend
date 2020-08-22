export interface User extends ProfileType {
  _id: string;
  email: string;
  emailValidated: boolean;
  posts?: PostType[];
  likedPosts?: PostType[];
  createdAt: Date;
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
  likes: string[];
}

export interface AuthorType {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: Blob | string;
}
