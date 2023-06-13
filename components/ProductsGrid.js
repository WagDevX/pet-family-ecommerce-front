import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
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