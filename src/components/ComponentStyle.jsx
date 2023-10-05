import styled, { keyframes } from "styled-components";


const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;  
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;  
    }
`;

export const AppContainer = styled.div`
  background-color: #f5f5f5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SelectContainer = styled.div`
  width: 300px;
  margin: 20px auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


export const GalleryContainer = styled.div`

  max-width: 100%;
  max-height: 240px;
  margin: 0 auto;
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 1.5s easy-in-out;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;