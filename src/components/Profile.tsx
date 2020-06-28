import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import useGlobal from '../hooks/useGlobal';
import useHttp from '../hooks/useHttp';
import { getOneProfile, getAvatar, getUserPosts } from '../api/api';
import { ProfileType, PostType } from '../types';

import EditProfile from './EditProfile';
import PostList from './Post/PostList';
import { Text, H2 } from './common/Typography';
import { Container } from './common/Layout';
import { Button, BackButton } from './common/Button';
import Loading from './common/Loading';
import { size, device } from './GlobalStyle';

const Profile: React.FC = () => {
  const { user } = useGlobal();
  const { params } = useRouteMatch<{ id: string }>();
  const [onEdit, setEdit] = useState(false);

  const profileAPI = useHttp<ProfileType>();
  const avatarAPI = useHttp<Blob>();
  const postsAPI = useHttp<PostType[]>();

  useEffect(() => {
    profileAPI.callAPI({ asyncFunction: () => getOneProfile(params.id) });
    postsAPI.callAPI({ asyncFunction: () => getUserPosts(params.id) });
  }, [params.id, profileAPI.callAPI, postsAPI.callAPI]);

  useEffect(() => {
    if (profileAPI.res?.data.avatar)
      avatarAPI.callAPI({ asyncFunction: () => getAvatar(params.id) });
  }, [params.id, profileAPI.res, avatarAPI.callAPI]);

  if (profileAPI.loading) return <Loading loading={profileAPI.loading} />;

  return (
    <>
      {onEdit && profileAPI.res ? (
        <EditProfile profile={profileAPI.res.data} avatar={avatarAPI.res?.data} setEdit={setEdit} />
      ) : (
        <>
          <ProfileSection>
            <div className='header'>
              <BackButton />
              <H2>PROFILE</H2>
              {user?._id === params.id ? (
                <Button type='button' onClick={() => setEdit(true)}>
                  EDIT
                </Button>
              ) : (
                <div />
              )}
            </div>

            <ProfileContainer className='container'>
              <Avatar className='avatar' withPicture={avatarAPI.res ? true : false}>
                {avatarAPI.res ? (
                  <img src={URL.createObjectURL(avatarAPI.res.data)} alt='' />
                ) : (
                  <div className='initial-letter'>
                    {profileAPI.res?.data.firstName && profileAPI.res.data.firstName[0]}
                  </div>
                )}
              </Avatar>

              <div className='field firstName'>
                <label>FIRST NAME</label>
                <Text>{profileAPI.res?.data.firstName}</Text>
              </div>
              <div className='field lastName'>
                <label>LAST NAME</label>
                <Text>{profileAPI.res?.data.lastName}</Text>
              </div>
              <div className='field gender'>
                <label>GENDER</label>
                <Text>{profileAPI.res?.data.gender}</Text>
              </div>
              <div className='field age'>
                <label>AGE</label>
                <Text>{profileAPI.res?.data.age}</Text>
              </div>
              <div className='field bio'>
                <label>BIO</label>
                <Text>{profileAPI.res?.data.bio}</Text>
              </div>
              <div className='field location'>
                <label>LOCATION</label>
                <Text>{profileAPI.res?.data.location}</Text>
              </div>
            </ProfileContainer>
          </ProfileSection>

          <PostSection>
            <div className='header'>
              <H2>POSTS</H2>
            </div>

            {postsAPI.res && <PostList posts={postsAPI.res.data} />}
          </PostSection>
        </>
      )}
    </>
  );
};

export default Profile;

export const ProfileSection = styled.section`
  max-width: ${size.tablet};
  margin: auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .gender {
    p {
      text-transform: capitalize;
    }
  }

  .firstName p,
  .lastName p {
    font-size: 25px;
    font-weight: bold;
    text-transform: uppercase;
  }

  @media (max-width: ${size.phone}) {
    .firstName p,
    .lastName p {
      font-size: 20px;
    }
  }
`;

export const ProfileContainer = styled(Container)`
  max-width: ${size.tablet};
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'avatar'
    'firstName'
    'lastName'
    'gender'
    'age'
    'bio'
    'location';

  @media ${device.tablet} {
    grid-template-columns: 200px 1fr 1fr;
    grid-template-areas:
      'avatar firstName lastName'
      '...... gender gender'
      '...... age age'
      '...... bio bio'
      '...... location location';
  }

  .field {
    padding: 0.7em;
    & > label {
      font-size: 12px;
      color: var(--main);
    }
  }

  .avatar {
    grid-area: avatar;
    justify-self: center;
  }

  .firstName {
    grid-area: firstName;
  }
  .lastName {
    grid-area: lastName;
  }
  .gender {
    grid-area: gender;
  }
  .age {
    grid-area: age;
  }
  .bio {
    grid-area: bio;
  }
  .location {
    grid-area: location;
  }
`;

export const Avatar = styled.div<{ withPicture: boolean }>`
  grid-area: avatar;
  width: 100px;
  height: 100px;
  margin: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${p => (p.withPicture ? null : '#ddd')};
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }

  .initial-letter {
    font-size: 40px;
    font-weight: bold;
    color: #888;
  }
`;

export const PostSection = styled.section`
  max-width: ${size.desktopL};
  margin: auto;
  .header {
    padding: 1.5em;
    text-align: center;
  }
`;
