import styled from "styled-components";
import ProductBox from "./ProductBox";
import { RevealWrapper } from "next-reveal";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 393px) {
    grid-template-columns: 1fr;
  }
`;

export default function ProductsGrid({ products, wishedProducts }) {
  return (
    <StyledProductsGrid>
      {products?.map((product, index) => (
        <RevealWrapper key={product._id} delay={index * 50}>
          <ProductBox  {...product} 
          wished={wishedProducts.includes(product._id)}/>
        </RevealWrapper>
      ))}
    </StyledProductsGrid>
  );
}
