import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import useHttp from '../../hooks/useHttp';
import { getImage, getAvatar } from '../../api/api';
import { Post } from '../../types/types';

import { Text } from '../common/Typography';
import Button from '../common/Button';
import { device } from '../AppStyles';

export interface PostCardProps {
  variant: 'feed' | 'mypost';
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ variant, post }) => {
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
    <Card>
      <div className='image'>{imageURL && <Image url={imageURL} />}</div>

      <div className='title'>
        <Text>{title}</Text>
      </div>

      <div className='avatar'>
        <Avatar url={avatarURL} />
      </div>

      <div className='author'>
        <Text>{author.profile.firstName + ' ' + author.profile.lastName}</Text>
      </div>

      <div className='date'>
        <Text secondary>{date}</Text>
      </div>

      <div className='buttons'>
        <Button>READ</Button>
      </div>
    </Card>
  );
};

export default PostCard;

export const Card = styled.div`
  width: 450px;
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
    padding: 0.7rem 1rem;
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
  border-radius: 50%;
`;
