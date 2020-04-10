import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../../theme';
import useGlobal from '../../hooks/useGlobal';
import useHttp from '../../hooks/useHttp';
import { getOneProfile, getAvatar, getUserPosts } from '../../api/api';
import { ProfileType, PostType } from '../../types/types';

import { Div, ProfileSection, PostSection, Avatar } from './ProfileStyles';
import EditProfile from './EditProfile';
import PostCard from '../Post/PostCard';
import { Text, H2, H3 } from '../common/Typography';
import { HorizontalCenter, Container } from '../common/Layout';
import Button from '../common/Button';

const Profile: React.FC = () => {
  const { user } = useGlobal();
  const { params } = useRouteMatch<{ id: string }>();
  const [editting, setEditting] = useState(false);
  const [activeHeader, setActiveHeader] = useState('posts');

  const profile = useHttp<ProfileType>();
  const avatar = useHttp<Blob>();
  const posts = useHttp<PostType[]>();
  const favorites = useHttp<PostType[]>();

  useEffect(() => {
    profile.callAPI({ asyncFunction: () => getOneProfile(params.id) });
    posts.callAPI({ asyncFunction: () => getUserPosts(params.id) });
  }, [params.id, profile.callAPI, posts.callAPI]);

  useEffect(() => {
    if (profile.res?.data.avatar) avatar.callAPI({ asyncFunction: () => getAvatar(params.id) });
  }, [params.id, profile.res, avatar.callAPI]);

  return (
    <>
      {editting ? (
        <EditProfile
          data={profile.res?.data}
          avatarURL={avatar.res?.data && URL.createObjectURL(avatar.res?.data)}
          setEditting={setEditting}
        />
      ) : (
        <Div>
          <ProfileSection>
            <div className='header'>
              <H2>PROFILE</H2>
              {user?._id === params.id && (
                <Button type='button' onClick={() => setEditting(true)}>
                  EDIT
                </Button>
              )}
            </div>

            <HorizontalCenter>
              <PulseLoader loading={profile.loading} color={theme.color.main} size={12} />
            </HorizontalCenter>

            <Container className='container' size='tablet'>
              <Avatar url={avatar.res ? URL.createObjectURL(avatar.res.data) : null} />

              <div className='firstName'>
                <label>FIRST NAME</label>
                <Text>{profile.res?.data.firstName}</Text>
              </div>
              <div className='lastName'>
                <label>LAST NAME</label>
                <Text>{profile.res?.data.lastName}</Text>
              </div>
              <div className='gender'>
                <label>GENDER</label>
                <Text>{profile.res?.data.gender}</Text>
              </div>
              <div className='age'>
                <label>AGE</label>
                <Text>{profile.res?.data.age}</Text>
              </div>
              <div className='bio'>
                <label>BIO</label>
                <Text>{profile.res?.data.bio}</Text>
              </div>
              <div className='location'>
                <label>LOCATION</label>
                <Text>{profile.res?.data.location}</Text>
              </div>
            </Container>
          </ProfileSection>

          <PostSection>
            <div className='header'>
              <H3
                className={activeHeader === 'posts' ? 'active' : ''}
                onClick={() => setActiveHeader('posts')}
              >
                POSTS
              </H3>
              <H3
                className={activeHeader === 'favorites' ? 'active' : ''}
                onClick={() => setActiveHeader('favorites')}
              >
                FAVORITES
              </H3>
            </div>

            {posts.res?.data.map((post) => (
              <PostCard
                className='post-card'
                key={post._id}
                post={post}
                variant={user?._id === params.id ? 'mypost' : 'feed'}
              />
            ))}
          </PostSection>
        </Div>
      )}
    </>
  );
};

export default Profile;
