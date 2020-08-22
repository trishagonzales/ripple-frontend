import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Center } from '../components/common/Layout';

interface WrapperProps {
  Component: React.FC<{ url: string | undefined }>;
  file?: Blob;
  setFile: React.Dispatch<React.SetStateAction<Blob | undefined>>;
}

interface ComponentProps {
  iconSize?: string;
}

const wrapper = ({ Component, file, setFile }: WrapperProps) =>
  React.memo(({ iconSize = '18px' }: ComponentProps) => {
    return (
      <Div iconSize={iconSize}>
        <input id='input' type='file' accept='image/*' onChange={(e: any) => setFile(e.target.files[0])} />

        <label htmlFor='input' className='upload'>
          <Component url={file && URL.createObjectURL(file)}>
            <Center>
              <div className='icon'>
                <i className='fas fa-upload' />
              </div>
            </Center>
          </Component>
        </label>
      </Div>
    );
  });

const useUpload = (Component: React.FC, initialState?: Blob) => {
  const [file, setFile] = useState(initialState);
  const Upload = useCallback(wrapper({ Component, file, setFile }), [Component, file]);

  return { Upload, file };
};

export default useUpload;

export const Div = styled.div<{ iconSize: string }>`
  height: auto;

  #input {
    display: none;
  }

  label.upload {
    text-align: center;
    cursor: pointer;
    :hover {
      filter: brightness(95%);
    }

    .icon {
      padding: 0.2em 0.5em;
      font-size: ${(p) => p.iconSize};
      color: grey;
      background: #ddd;
      border-radius: 10px;
      opacity: 0.8;
    }
  }
`;
