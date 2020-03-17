import React, { useState, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../../theme';
import { GlobalContext } from '../../providers';
import useFetch from '../../hooks/useFetch';
import url from '../../api/endpoints.json';
import { ProfileType, Post } from '../../types/types';

import { Div, ProfileSection, PostSection, Image } from './ProfileStyles';
import EditProfile from './EditProfile';
import { Text, H2 } from '../common/Typography';
import { HorizontalCenter, Container } from '../common/Layout';
import Button from '../common/Button';

const Profile: React.FC = () => {
  const {
    global: { user }
  } = useContext(GlobalContext);
  const match = useRouteMatch<{ id: string }>();
  const [editting, setEditting] = useState(false);

  const profile = useFetch<ProfileType>(`${url.profiles}/${match.params.id}`);
  // const posts = useFetch<Post[]>(`${url.posts}/user/${match.params.id}`);
  const image = useFetch<Blob>({
    method: 'GET',
    url: `${url.uploads}/avatar/${match.params.id}`,
    responseType: 'blob'
  });

  return (
    <>
      {editting ? (
        <EditProfile
          data={profile.data}
          imgURL={URL.createObjectURL(image.data)}
          setEditting={setEditting}
        />
      ) : (
        <Div>
          <ProfileSection>
            <div className='header'>
              <H2>PROFILE</H2>
              {user?._id === match.params.id && (
                <Button type='button' onClick={() => setEditting(true)}>
                  EDIT
                </Button>
              )}
            </div>

            <HorizontalCenter>
              <PulseLoader loading={profile.isLoading} color={theme.color.main} size={12} />
            </HorizontalCenter>

            <Container className='container' size='tablet'>
              <Image url={image.data ? URL.createObjectURL(image.data) : null} />

              <div className='firstName'>
                <label>FIRST NAME</label>
                <Text>{profile.data?.firstName}</Text>
              </div>

              <div className='lastName'>
                <label>LAST NAME</label>
                <Text>{profile.data?.lastName}</Text>
              </div>

              <div className='gender'>
                <label>GENDER</label>
                <Text>{profile.data?.gender}</Text>
              </div>

              <div className='age'>
                <label>AGE</label>
                <Text>{profile.data?.age}</Text>
              </div>

              <div className='bio'>
                <label>BIO</label>
                <Text>{profile.data?.bio}</Text>
              </div>

              <div className='location'>
                <label>LOCATION</label>
                <Text>{profile.data?.location}</Text>
              </div>
            </Container>
          </ProfileSection>

          {user?._id !== match.params.id ? (
            <PostSection>
              <div className='header'>
                <H2>POSTS</H2>
              </div>

              <Container size='tablet'>
                <div></div>
              </Container>
            </PostSection>
          ) : null}
        </Div>
      )}
    </>
  );
};

export default Profile;
