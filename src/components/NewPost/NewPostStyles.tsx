import styled from 'styled-components';
import { Textarea } from '../common/Input';
import { device } from '../AppStyles';

export const Div = styled.div`
  h1 {
    text-align: center;
  }

  h2 {
    margin-top: 1em;
  }

  #input-file {
    display: none;
  }

  .form-buttons {
    display: flex;
    margin-top: 1.5em;

    button {
      flex: 1;
      padding: 0.7em 1.2em;
    }

    @media ${device.phoneS} {
      flex-direction: column;
    }
  }
`;

export const UploadImage = styled.div<{ image: any }>`
  width: 100%;
  height: 250px;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px dashed lightgrey;
  background: url(${(p) => p.image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  .img-upload-btn {
    padding: 0.6em 0.8em;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: grey;
    ${(p) => p.theme.borderRadius};
    background: ${(p) => p.theme.color.bg2};
    opacity: 0.8;
    cursor: pointer;
    :hover {
      filter: brightness(98%);
    }
  }
`;

export const Title = styled(Textarea)`
  height: 140px;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Body = styled(Textarea)`
  height: 600px;
  font-size: 1rem;
`;
