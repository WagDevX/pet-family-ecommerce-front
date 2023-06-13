import styled from "styled-components";
import CartIconPlus from "./icons/CartIconPlus";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import Button from "./Button";

const ProductWrapper = styled.div`
`;

const WhiteBox = styled.div`
  text-decoration: none;
  color: inherit;
  background-color: #fff;
  padding: 15px;
  height: 170px;
  text-align: center;
  display: grid;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 1px 2px 2px rgba(25, 50, 47, 0.08),
    0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 5px rgba(18, 71, 52, 0.03);
  img {
    max-width: 100%;
    max-height: 100px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
  max-width: 220px;
`;

const ProductInfoBox = styled.div`
  margin-top: 2px;
`;

const PriceRow = styled.div`
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const {addProduct} = useContext(CartContext);
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox>
        <Title href={url}>{title}</Title>
        <div>
          <img src={images[0]} alt={title} />
        </div>
        <ProductInfoBox>
          <PriceRow>
            <Price>R$ {price}</Price>
            <Button onClick={() => {addProduct(_id)}} outline='true' primary='true'>
              <CartIconPlus />
            </Button>
          </PriceRow>
        </ProductInfoBox>
      </WhiteBox>
    </ProductWrapper>
  );
}
