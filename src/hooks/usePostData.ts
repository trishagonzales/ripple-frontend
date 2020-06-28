import { useState, useEffect } from 'react';
import moment from 'moment';
import { PostType, AuthorType } from '../types';

const usePostData = () => {
  const [post, setPost] = useState<PostType | undefined>();
  const [author, setAuthor] = useState<AuthorType | undefined>();
  const [date, setDate] = useState<string | undefined>();
  const [postBody, setPostBody] = useState<string>(' ');

  useEffect(() => {
    if (post) {
      setAuthor(post.author);
      setDate(moment(post.dateCreated).format('l'));
      setPostBody(() => post?.body.replace(/(?:\r\n|\r|\n)/g, '<br />'));
    }
  }, [post]);

  return { post, author, date, postBody, setPost };
};

export default usePostData;
