import styled from "styled-components";
import Center from "./Center";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import axios from "axios";

const BannerHolder = styled.div`
  margin-top: 30px;
  img {
    width: 100%;
    border-radius: 5px;
  }
`;

export default function Banner() {
  const [bannerImg, setBannerImg] = useState('');
  useEffect(() => {
    axios.get('/api/settings?name=bannerFront').then((response) => {
      setBannerImg(response.data.value)
    })
  },[])
  return (
    <Center>
      <RevealWrapper>
        <BannerHolder>
          <img
            src={bannerImg}
            alt=""
          />
        </BannerHolder>
      </RevealWrapper>
    </Center>
  );
}
