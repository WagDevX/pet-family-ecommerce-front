import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import CartIconPlus from "@/components/icons/CartIconPlus";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 1px 2px 2px rgba(25, 50, 47, 0.08),
    0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 5px rgba(18, 71, 52, 0.03);
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 30px;
  @media (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
    font-size: 1.8rem;
`;

const StyledNotification = styled.div`
   display: flex;
   align-items: center;
`;

export default function ProductPage({ product }) {
  const {addProduct} = useContext(CartContext);
  const notify = () => {
    toast.success(
      <StyledNotification>
          <img src={product.images[0]} alt={product.title} style={{ marginRight: "3px", width: "80px", height: "80px" }} />
          <div>
          <span style={{ fontWeight: "bold" }}>{product.title}</span> adicionado ao carrinho!
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
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
            <Price>R$ {product.price}</Price>
            <div>
              <Button primary='true' onClick={() => {
                addProduct(product._id);
                notify();
                }}>
                <CartIconPlus />
                Adicionar ao carrinho
              </Button>
            </div>
          </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
