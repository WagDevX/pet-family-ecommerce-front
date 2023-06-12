import Featured from "@/components/Featured"
import Header from "@/components/Header"
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({featuredProduct, newProducts}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProducId = '64865ea9bb8a552d4b44d7d7';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProducId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))},
  }
}
