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
  author: string;
  dateCreated: string;
  lastModified?: string;
}
