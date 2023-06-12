import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";


const Bg = styled.div`
  background-color: #aaffe2;
  color: #00bd8e;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const SubTitle = styled.h4`
  margin: 1;
  font-weight: normal;
`;

const Desc = styled.p`
  color: #00bd8e;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 90px;
  img {
    width: 25vh;
    border-radius: 15px;
  }
`;

const Column = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({product}) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>
                {product.description}
              </Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/products/'+product._id} outline={1} white={1}>
                  Ler mais
                </ButtonLink>
                <Button primary>
                  <CartIcon/>
                  Comprar
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]}></img>
            <img src='https://wagner-nextjs-ecommerce.s3.amazonaws.com/1686553210801.png'></img>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
