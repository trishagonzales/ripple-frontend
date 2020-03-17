import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from './Typography';

export interface AuthorProps {
  id: string;
  name: string;
  avatar: string;
}

const Author: React.FC<AuthorProps> = ({ id, name, avatar }) => {
  return (
    <Div>
      <Link to={`/profile/${id}`}>
        <Image src={avatar} alt='author' />
        <Text>{name}</Text>
      </Link>
    </Div>
  );
};

export default Author;

export const Div = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  flex: content;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled(Text)`
  flex: 1fr;
`;
