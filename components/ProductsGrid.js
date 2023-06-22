import styled from "styled-components";
import ProductBox from "./ProductBox";

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

export default function ProductsGrid({products}) {
    return (
        <StyledProductsGrid>
            {products?.map(product => (
                <ProductBox key={product._id} {...product}/>
            ))}
        </StyledProductsGrid>
    )
}