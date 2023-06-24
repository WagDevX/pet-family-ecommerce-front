import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
    font-size: 1.5em;
    margin: 20px 0 20px;
`;

export default function NewProducts({products, wishedProducts}) {
return (
    <Center>
        <Title>Produtos</Title>
        <ProductsGrid products={products} wishedProducts={wishedProducts} />
        <Title>Marcas</Title>
    </Center>
);
}

