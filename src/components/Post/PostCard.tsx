import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import useHttp from '../../hooks/useHttp';
import { getImage, getAvatar } from '../../api/api';
import { PostType } from '../../types/types';

import { Text } from '../common/Typography';
import Button from '../common/Button';
import { device } from '../AppStyles';

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
  width: 420px;
  height: auto;
  margin: 1rem;
  padding-bottom: 0.7rem;
  display: grid;
  grid-template-columns: 60px 1fr 15% 15%;
  grid-template-rows: 100px auto auto auto;
  grid-template-areas:
    'img    img    img     img'
    'title  title  title   title'
    'avatar author buttons buttons'
    'avatar date   buttons buttons';

  ${(p) => p.theme.boxShadow};
  ${(p) => p.theme.borderRadius};
  background: white;
  transition: transform ease-out 300ms;

  :hover {
    box-shadow: 0px 0px 20px lightgrey;
    transform: translateY(-3px);
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
    padding: 1rem 1rem;
    p {
      font-size: 18px;
      font-weight: bold;
      line-height: 20px;
    }
  }
  .avatar {
    grid-area: avatar;
    justify-self: center;
    align-self: center;
    padding-left: 0.7em;
  }
  .author {
    grid-area: author;
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
    margin: 0 0.7rem 0 0;
  }

  @media ${device.tablet} {
    /* width: 500px; */
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
