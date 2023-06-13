import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function ProductsPage({products}) {
  return (
    <>
      <Header />
      <Center>
        <Title>Todos os produtos</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {sort:{_id:-1}});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
