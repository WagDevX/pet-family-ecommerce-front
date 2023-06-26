import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIconPlus";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RevealWrapper } from "next-reveal";
import Banner from "./Banner";

const Bg = styled.div`
  background-color: #aaffe2;
  color: #00bd8e;
  padding: 30px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Desc = styled.p`
  color: #00bd8e;
  font-size: 0.8rem;
  text-align: left;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 90px;
  img {
    max-width: 230px;
    max-height: 100%;
  }
  div:nth-child(1) {
    order: 0;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    div:nth-child(1) {
      order: 2;
    }
    img {
      width: 18vh;
      border-radius: 15px;
    }
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

const StyledNotification = styled.div`
  display: flex;
  align-items: center;
`;

const CenterImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ImgColumn = styled(Column)`
  & > div {
    width: 100%;
  }
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  const notify = () => {
    toast.success(
      <StyledNotification>
        <img
          src={product.images[0]}
          alt={product.title}
          style={{ marginRight: "3px", width: "80px", height: "80px" }}
        />
        <div>
          <span style={{ fontWeight: "bold" }}>{product.title}</span> adicionado
          ao carrinho!
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
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <RevealWrapper origin={"left"} delay={0}>
                <Title>{product.title}</Title>
                <Desc>{product.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink
                    href={"/products/" + product._id}
                    outline={1}
                    white={1}
                  >
                    Ler mais
                  </ButtonLink>
                  <Button
                    primary="true"
                    onClick={() => {
                      addFeaturedToCart();
                      notify();
                    }}
                  >
                    <CartIcon />
                    Comprar
                  </Button>
                </ButtonsWrapper>
              </RevealWrapper>
            </div>
          </Column>

          <ImgColumn>
            <RevealWrapper delay={0}>
              <CenterImg>
                <img src={product.images[0]}></img>
              </CenterImg>
            </RevealWrapper>
          </ImgColumn>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
