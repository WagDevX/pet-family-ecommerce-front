import styled from "styled-components";

const Box = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  place-items: center;
  text-align: center;
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
  img{
    width: 100%;
    width: 100%;
  }

`;

export default function BrandBox({name, src}) {
    return (
        <>
        <Box>
            <img src={src} alt={src} />
        </Box>
        </>
    )
}