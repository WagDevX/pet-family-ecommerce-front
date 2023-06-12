import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
`;

const Title = styled.h2`
    font-size: 2rem;
    margin: 20px 0 20px;
`;

export default function NewProducts({products}) {
return (
    <Center>
        <Title>Produtos</Title>
        <ProductsGrid>
            {products?.map(product => (
                <ProductBox {...product}/>
            ))}
        </ProductsGrid>
        <Title>Marcas</Title>
    </Center>
);
}

