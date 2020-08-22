import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../../hooks/useHttp';
import { getAvatar } from '../../api/api';
import { AuthorType } from '../../types';
import { Text } from './Typography';

export interface AuthorProps {
  author: AuthorType | undefined;
  imgSize?: string;
  textSize?: string;
  className?: string;
}

const Author: React.FC<AuthorProps> = ({ author, imgSize = '30px', textSize = '14px', className = 'author' }) => {
  const avatarAPI = useHttp<Blob>();

  useEffect(() => {
    if (author?.avatar) avatarAPI.callAPI({ asyncFunction: getAvatar, values: author._id });
  }, [author, avatarAPI.callAPI]);

  return (
    <Link to={`/profile/${author?._id}`}>
      <Div className={className} imgSize={imgSize} textSize={textSize}>
        {avatarAPI.res ? (
          <img src={URL.createObjectURL(avatarAPI.res.data)} alt='author' />
        ) : (
          <div className='no-avatar'>{author?.firstName[0]}</div>
        )}
        <Text className='name'>{author && author.firstName + ' ' + author.lastName}</Text>
      </Div>
    </Link>
  );
};

export default Author;

export const Div = styled.div<{ imgSize: string; textSize: string }>`
  display: flex;
  align-items: center;
  :hover {
    .name {
      text-decoration: underline;
    }
  }

  img {
    width: ${(p) => p.imgSize};
    height: ${(p) => p.imgSize};
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

  .no-avatar {
    width: ${(p) => p.imgSize};
    height: ${(p) => p.imgSize};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: darkgrey;
    background: #eee;
    border-radius: 50%;
  }

  .name {
    margin-left: 0.4em;
    font-size: ${(p) => p.textSize};
  }
`;
