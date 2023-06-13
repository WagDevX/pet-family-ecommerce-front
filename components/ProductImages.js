import { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
 max-width: 100%;
 max-height: 280px;
`;

const ImageButtons = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
`;
const ImageButton = styled.div`
    border: 2px solid #aaa;
  ${props => props.active ? `
     border-color: ccc;
  ` : `
     border-color: transparent;
  `}
  height: 50px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
    <BigImageWrapper>
    <BigImage src={activeImage} />
    </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
          key={image} 
          active={image===activeImage} 
          onClick={() => setActiveImage(image)}>
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
