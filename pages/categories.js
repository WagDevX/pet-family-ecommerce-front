import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { primary } from "@/lib/colors";
import { Category } from "@/models/Caregory";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";

const CategoryGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
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
   height: 250px;
   border-radius: 10px;
   align-items: center;
   display: flex;
   justify-content: center;
   color: ${primary};
   text-decoration: none;
`;


export default function CategoriesPage({mainCategories, categoriesProducts}) {
  return (
    <>
      <Header/>
        <Center>
          {mainCategories.map(cat => (
            <CategoryWrapper>
                <CategoryTitle key={cat.name}>
                    <h2>{cat.name}</h2>
                    <div><Link href={'/category/'+cat._id}>Mostrar tudo</Link></div>
                </CategoryTitle>
                <CategoryGrid>
                    {categoriesProducts[cat._id].map(p => (
                        <ProductBox {...p}/>
                    ))}
                    
                    <ShowAllSquare href={'/category/'+cat._id}>Mostrar tudo &rarr;</ShowAllSquare>
                </CategoryGrid>       
            </CategoryWrapper>
          ))}
        </Center>
    </>
  );
}

export async function getServerSideProps () {
    const categories = await Category.find();
    const mainCategories = categories.filter(c => !c.parent)
    const categoriesProducts = {};
    for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString();
        const childCatIds = categories
        .filter(c => c?.parent?.toString() === mainCatId)
        .map(c => c._id.toString());
        const categoriesIds = [mainCatId, ...childCatIds];
        const products = await Product
        .find({category: categoriesIds}, null, {limit:3, sort:{'_id':-1}})
        categoriesProducts[mainCat._id] = products;
        
    }
    return {
        props: {
            mainCategories: 
            JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
}
};