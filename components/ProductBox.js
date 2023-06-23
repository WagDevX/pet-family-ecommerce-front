import styled from "styled-components";
import CartIconPlus from "./icons/CartIconPlus";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import Button from "./Button";
import { primary } from "@/lib/colors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const WhiteBox = styled.div`
  transition: 0.13s ease;
  text-decoration: none;
  color: inherit;
  background-color: #fff;
  padding: 15px;
  width: 160px;
  height: 220px;
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

export default function ProductBox({ _id, title, description, price, images }) {
  const notify = () => {
    toast.success(
      <StyledNotification>
          <img src={images[0]} alt={title} style={{ marginRight: "3px", width: "80px", height: "80px" }} />
          <div>
          <span style={{ fontWeight: "bold" }}>{title}</span> adicionado ao carrinho!
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
  return (
    <ProductWrapper>
      <WhiteBox>
        <Link href={"product/" + _id}>
          <img src={images[0]} alt={title} />
        </Link>
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
