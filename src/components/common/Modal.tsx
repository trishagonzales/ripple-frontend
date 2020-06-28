import React from 'react';
import styled from 'styled-components';

export interface ModalProps {
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen = false }) => {
  if (!isOpen) return null;

  return (
    <Div>
      <Box>{children}</Box>
    </Div>
  );
};

export default Modal;

export const Div = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;

export const Box = styled.div`
  width: 400px;
  height: 200px;
  padding: 1.5em 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: white;
  border-radius: var(--borderRadius);

  .buttons {
    margin-left: auto;
  }
`;
