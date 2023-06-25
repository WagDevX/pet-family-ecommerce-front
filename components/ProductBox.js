import styled from "styled-components";
import CartIconPlus from "./icons/CartIconPlus";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { primary } from "@/lib/colors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";

const ProductWrapper = styled.div`
  padding: 2px;
  display: grid;
  grid-template-columns: 1fr;
`;

const WhiteBox = styled.div`
  position: relative;
  transition: 0.13s ease;
  text-decoration: none;
  color: inherit;
  background-color: #fff;
  padding: 15px;
  width: 160px;
  height: 240px;
  min-height: 240px;
  text-align: center;
  display: grid;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid transparent;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
  &:hover {
    border: 1px solid ${primary};
    box-shadow: 0 0 0;
  }
  @media (max-width: 768px) {
    height: 220px;
  }
  @media (max-width: 393px) {
    width: 80%;
    height: 80%;
  }
  u {
    text-align: left;
    font-size: 0.8rem;
    color: #aaa;
  }
`;
const WishButton = styled.button`
    border: 0;
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: transparent;
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    ${props => props.wished ? `
     color: red;
    ` : `
     color: ${primary};
    `}
    svg{
      width: 20px;
    }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.8rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
  max-width: 220px;
  text-align: left;
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
  color: ${primary};
`;

const StyledNotification = styled.div`
  display: flex;
  align-items: center;
`;

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  properties,
  wished=false,
  onRemoveFromWishList=()=>{}
}) {
  const notify = () => {
    toast.success(
      <StyledNotification>
        <img
          src={images[0]}
          alt={title}
          style={{ marginRight: "3px", width: "80px", height: "80px" }}
        />
        <div>
          <span style={{ fontWeight: "bold" }}>{title}</span> adicionado ao
          carrinho!
        </div>
      </StyledNotification>,
      {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);
  function addToWishList() {
      const nextValue = !isWished;
      if (nextValue === false && onRemoveFromWishList) {
        onRemoveFromWishList(_id);
      }
      axios.post('/api/wishlist', {
        product: _id
      }).then(() => {})
      setIsWished(nextValue);

  }

  return (
    <ProductWrapper>
      <WhiteBox>
        <WishButton wished={isWished} onClick={addToWishList}>
          {isWished ? <HeartSolidIcon/> : <HeartOutlineIcon/>}
        </WishButton>
        <Link href={"product/" + _id}>
          <img src={images[0]} alt={title} />
        </Link>
        <u>{properties.Marca}</u>
        <Title href={url}>{title}</Title>
        <ProductInfoBox>
          <PriceRow>
            <Price>R$ {price}</Price>
            <Button
              onClick={() => {
                addProduct(_id);
                notify();
              }}
              outline="true"
              primary="true"
            >
              <CartIconPlus />
            </Button>
          </PriceRow>
        </ProductInfoBox>
      </WhiteBox>
    </ProductWrapper>
  );
}
