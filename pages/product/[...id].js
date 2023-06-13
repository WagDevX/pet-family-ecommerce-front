import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIconPlus from "@/components/icons/CartIconPlus";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 20px;
    margin-top: 30px;
`;

export default function ProductPage({product}) {
    return (
        <>
        <Header />
        <Center>
            <ColWrapper>
            <WhiteBox>
              <ProductImages images={product.images}/>
            </WhiteBox>
             <div>
             <Title>{product.title}</Title>
             <p>{product.description}</p>
             <Button primary><CartIconPlus />Adicionar ao carrinho</Button>
             </div>
            </ColWrapper>
            
        </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}