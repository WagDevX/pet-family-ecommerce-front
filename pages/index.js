import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { Setting } from "@/models/Setting";
import Banner from "@/components/Banner";
import Title from "@/components/Title";
import Center from "@/components/Center";
import BrandBox from "@/components/BrandBox";
import styled from "styled-components";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const BrandsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProducts,
}) {
  const [slidesPerView, setSlidesPerView] = useState(5);
  useEffect(() => {
    let windowsize = parseInt(window.innerWidth);
    if (windowsize < 600) {
      setSlidesPerView(3);
    }
    if (windowsize < 420) {
      setSlidesPerView(2);
    }
  }, []);
  const brands = [
    {
      name: "Royal Canin",
      Image:
        "https://wagner-nextjs-ecommerce.s3.sa-east-1.amazonaws.com/pngwing.com.png",
    },
    {
      name: "Premier",
      Image:
        "https://wagner-nextjs-ecommerce.s3.sa-east-1.amazonaws.com/logo+novo+(1).png",
    },
    {
      name: "Gran Plus",
      Image:
        "https://www.premiocaio.com.br/Wfiles/images/conteudo/cases/logo/e3fc7b1b78f24ffea3793240d32f4a75.png",
    },
    {
      name: "N&D",
      Image:
        "https://seeklogo.com/images/F/farmina-pet-foods-logo-19EA90C73A-seeklogo.com.png",
    },
    {
      name: "Pedigree",
      Image:
        "https://seeklogo.com/images/P/pedigree-logo-2CB925BA9C-seeklogo.com.png",
    },
    {
      name: "Origens",
      Image:
        "https://magpetchow.com.br/wp-content/uploads/2020/11/origens-logotipo.png",
    },
  ];
  return (
    <>
      <div>
        <Header />
        <Featured product={featuredProduct} />
        <Banner />
        <NewProducts
          products={newProducts}
          wishedProducts={wishedNewProducts}
        />
        <Center>
          <Title>Marcas</Title>
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.name}>
                <BrandBox name={brand.name} src={brand.Image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Center>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({
    name: "featuredProductId",
  });
  const featuredProducId = featuredProductSetting.value;
  const featuredProduct = await Product.findById(featuredProducId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  };
}
