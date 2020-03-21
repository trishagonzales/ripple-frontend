import React, { useState, useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../../theme';
import { GlobalContext } from '../../providers';
import useAPIError from '../../hooks/useAPIError';
import http from '../../api/http.api';
import url from '../../api/endpoints.json';
import { ProfileType } from '../../types/types';

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
  const [profile, setProfile] = useState<ProfileType>();
  const [image, setImage] = useState<Blob>();
  const [loading, setLoading] = useState(false);
  const onError = useAPIError();

  useEffect(() => {
    async function fetch() {
      if (!editting) {
        try {
          setLoading(true);

          // fetch profile
          const res1 = await http(`${url.profiles}/${match.params.id}`);
          setProfile(res1.data);

          // fetch image
          const res2 = await http({
            method: 'GET',
            url: `${url.uploads}/avatar/${match.params.id}`,
            responseType: 'blob'
          });
          setImage(res2.data);
        } catch (e) {
          onError(e);
        } finally {
          setLoading(false);
        }
      }
    }
    fetch();
  }, [editting, match.params.id]);

  return (
    <>
      {editting ? (
        <EditProfile id={user?._id} data={profile} imgURL={URL.createObjectURL(image)} setEditting={setEditting} />
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
              <PulseLoader loading={loading} color={theme.color.main} size={12} />
            </HorizontalCenter>

            <Container className='container' size='tablet'>
              <Image url={image ? URL.createObjectURL(image) : null} />

              <div className='firstName'>
                <label>FIRST NAME</label>
                <Text>{profile?.firstName}</Text>
              </div>
              <div className='lastName'>
                <label>LAST NAME</label>
                <Text>{profile?.lastName}</Text>
              </div>
              <div className='gender'>
                <label>GENDER</label>
                <Text>{profile?.gender}</Text>
              </div>
              <div className='age'>
                <label>AGE</label>
                <Text>{profile?.age}</Text>
              </div>
              <div className='bio'>
                <label>BIO</label>
                <Text>{profile?.bio}</Text>
              </div>
              <div className='location'>
                <label>LOCATION</label>
                <Text>{profile?.location}</Text>
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
