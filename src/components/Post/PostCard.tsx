import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import useHttp from '../../hooks/useHttp';
import { getImage, getAvatar } from '../../api/api';
import { PostType } from '../../types/types';

import { Text } from '../common/Typography';
import Button from '../common/Button';

export interface PostCardProps {
  className?: string;
  variant: 'feed' | 'mypost';
  post: PostType;
}

const PostCard: React.FC<PostCardProps> = ({ className, variant, post }) => {
  const { _id, title, author, lastModified, dateCreated } = post;
  const date = moment(lastModified ? lastModified : dateCreated).format('l');

  const [imageURL, setImageURL] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const image = useHttp();
  const avatar = useHttp();

  useEffect(() => {
    image.callAPI({ asyncFunction: () => getImage(_id) });
  }, [_id, image.callAPI]);

  useEffect(() => {
    avatar.callAPI({ asyncFunction: () => getAvatar(author._id) });
  }, [author._id, avatar.callAPI]);

  useEffect(() => {
    if (image.res) setImageURL(URL.createObjectURL(image.res.data));
    if (avatar.res) setAvatarURL(URL.createObjectURL(avatar.res.data));
  }, [image.res, avatar.res]);

  return (
    <Link to={`/post/${_id}`}>
      <Card className={className}>
        <div className='image'>{imageURL && <Image url={imageURL} />}</div>

        <div className='title'>
          <Text>{title}</Text>
        </div>

        {variant === 'feed' ? (
          <>
            <div className='avatar'>
              <Link to={`/profile/${post.author._id}`}>
                <Avatar url={avatarURL} />
              </Link>
            </div>

            <div className='author'>
              <Link to={`/profile/${post.author._id}`}>
                <Text>{author.profile.firstName + ' ' + author.profile.lastName}</Text>
              </Link>
            </div>
          </>
        ) : null}

        <div className='date'>
          <Text secondary>{date}</Text>
        </div>

        <div className='buttons'>
          {variant === 'feed' ? (
            <Button>READ</Button>
          ) : (
            <>
              <Button>EDIT</Button>
              <Button>DELETE</Button>
            </>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default PostCard;

export const Card = styled.div`
  width: auto;
  height: auto;
  padding-bottom: 0.6rem;
  display: grid;
  grid-template-columns: 60px 1fr 15% 15%;
  grid-template-rows: 100px 60px auto auto;
  grid-template-areas:
    'img    img    img     img'
    'title  title  title   title'
    'avatar author buttons buttons'
    'avatar date   buttons buttons';

  ${(p) => p.theme.borderRadius};
  background: white;
  transition: transform ease-out 300ms;

  :hover {
    box-shadow: 3px 3px 15px #ddd;
    transform: translateY(-2px);
  }

  & > div {
    p {
      font-size: 14px;
    }
  }

  .image {
    grid-area: img;
  }

  .title {
    grid-area: title;
    padding: 0.5rem 1rem;
    overflow-y: hidden;
    p {
      font-size: 16px;
      font-weight: bold;
      line-height: 20px;
    }
    :hover {
      text-decoration: underline;
    }
  }

  .avatar {
    grid-area: avatar;
    justify-self: center;
    align-self: center;
    padding-left: 0.6em;
  }

  .author {
    grid-area: author;
    :hover {
      text-decoration: underline;
    }
  }

  .date {
    grid-area: date;
    p {
      font-size: 13px;
    }
  }

  .buttons {
    grid-area: buttons;
    justify-self: end;
    margin: 0 0.6rem 0 0;
  }
`;

export const Image = styled.div<{ url: string }>`
  width: 100%;
  height: 100%;
  background: url(${(p) => p.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const Avatar = styled.div<{ url: string }>`
  width: 40px;
  height: 40px;
  background: ${(p) => (p.url ? `url(${p.url})` : 'lightgrey')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 50%;
`;
