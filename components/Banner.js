import styled from "styled-components";
import Center from "./Center";
import { RevealWrapper } from "next-reveal";

const BannerHolder = styled.div`
  margin-top: 30px;
  img {
    width: 100%;
    border-radius: 5px;
  }
`;

export default function Banner() {
  return (
    <Center>
      <RevealWrapper>
        <BannerHolder>
          <img
            src="https://wagner-nextjs-ecommerce.s3.sa-east-1.amazonaws.com/8865748-ai+(2).png"
            alt=""
          />
        </BannerHolder>
      </RevealWrapper>
    </Center>
  );
}
