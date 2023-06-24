import Featured from "@/components/Featured"
import Header from "@/components/Header"
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

export default function HomePage({featuredProduct, newProducts, wishedNewProducts}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts}/>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const featuredProducId = '64865ea9bb8a552d4b44d7d7';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProducId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  const wishedNewProducts = session?.user
  ? await WishedProduct.find({
      userEmail:session.user.email, 
      product: newProducts.map(p => p._id.toString())
  })
  : [];
  
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString())
    },
  }
}
