import Center from "@/components/Center";
import ProductBox from "@/components/ProductBox";
import { primary } from "@/lib/colors";
import { Category } from "@/models/Caregory";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProduct";
import Header from "@/components/Header";

const CategoryGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 15px;
    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 15px;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }
`;


const CategoryTitle = styled.div`
    display: flex;
    margin-top: 10px;
    margin-bottom: 0px;
    align-items: center;
    gap: 15px;
    h2{
        margin-bottom: 10px;
        margin-top: 10px;
    }
    a{
        color:${primary};
    }
`;

const CategoryWrapper = styled.div`
    margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
   background-color: #AAFFE2;
   height: 275px;
   border-radius: 10px;
   align-items: center;
   display: flex;
   justify-content: center;
   color: ${primary};
   text-decoration: none;
`;


export default function CategoriesPage({mainCategories, categoriesProducts, wishedProducts=[]}) {
  return (
    <>
    <Header/>
        <Center>
          {mainCategories.map(cat => (
            <CategoryWrapper key={cat._id}>
                <CategoryTitle key={cat.name}>
                    <h2>{cat.name}</h2>
                    <div><Link href={'/category/'+cat._id}>Mostrar tudo</Link></div>
                </CategoryTitle>
                <CategoryGrid>
                    {categoriesProducts[cat._id].map((p, index) => (
                        <RevealWrapper key={index} delay={index*50}>
                            <ProductBox {...p} wished={wishedProducts.includes(p._id)}/>
                        </RevealWrapper>
                        
                    ))}
                    <RevealWrapper delay={categoriesProducts[cat._id].length*50}>
                    <ShowAllSquare href={'/category/'+cat._id}>Mostrar tudo &rarr;</ShowAllSquare>
                    </RevealWrapper>
                    
                </CategoryGrid>       
            </CategoryWrapper>
          ))}
        </Center>
    </>
  );
}

export async function getServerSideProps (ctx) {
    const categories = await Category.find();
    const mainCategories = categories.filter(c => !c.parent)
    const categoriesProducts = {};
    const allFetchedProducts = [];
    for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString();
        const childCatIds = categories
        .filter(c => c?.parent?.toString() === mainCatId)
        .map(c => c._id.toString());
        const categoriesIds = [mainCatId, ...childCatIds];
        const products = await Product
        .find({category: categoriesIds}, null, {limit:4, sort:{'_id':-1}})
        allFetchedProducts.push(...products.map(p => p._id.toString()))
        categoriesProducts[mainCat._id] = products;

    }
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    const wishedProducts = session?.user
    ? await WishedProduct.find({
    userEmail: session.user.email, 
    product: allFetchedProducts
      }): [];
    return {
        props: {
            mainCategories: 
            JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
            wishedProducts: wishedProducts.map(i => i.product.toString())
    },
}
};