import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import { primary } from "@/lib/colors";
import { Category } from "@/models/Caregory";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";

const CategoryHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  h1 {
    font-size: 1.5em;
    margin-bottom: 5px;
  }
`;

const CategoryHeaderTitles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const FiltersWrapper = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 30px;
  @media (min-width: 768px) { 
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Filter = styled.div`
  color: ${primary};
  background-color: #aaffe2;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: ${primary};
  }
`;

export default function CategoryPage({
  category,
  subCategories,
  products: originalProducts,
}) {
  const defaultSorting = "price_desc";
  const defaultFiltersValues = category.properties.map((p) => ({
    name: p.name,
    value: "all",
  }));
  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFiltersValues] = useState(defaultFiltersValues);
  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [showFilters, setShowfilters] = useState(false);
  function handleFilterChange(filterName, filterValue) {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setFiltersChanged(true);
  }
  useEffect(() => {
    if (!filtersChanged) {
      return;
    }
    setLoadingProducts(true);
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    console.log(catIds);
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    filtersValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
    const url = "/api/products?" + params.toString();
    axios.get(url).then((res) => {
      setProducts(res.data);
      setTimeout(() => {
        setLoadingProducts(false);
      }, 1000);
    });
  }, [filtersValues, sort, filtersChanged]);
  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <CategoryHeaderTitles>
            <h1>{category.name}</h1>
            <Button 
            primary='true' 
            outline='true' 
            onClick={() => 
            showFilters === false ? setShowfilters(true) : setShowfilters(false)}>
              Filtrar por &darr;
            </Button>
          </CategoryHeaderTitles>
          {showFilters && (
            <FiltersWrapper>
            {category.properties.map((prop, index) => (
              <RevealWrapper delay={index*50}>
              <Filter key={prop.name}>
                <span>{prop.name}:</span>
                <select
                  onChange={(ev) =>
                    handleFilterChange(prop.name, ev.target.value)
                  }
                  value={filtersValues.find((f) => f.name === prop.name).value}
                >
                  <option value="all">Tudo</option>
                  {prop.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
              </RevealWrapper>
            ))}
            <RevealWrapper delay={category.properties.length*50}>
            <Filter>
              <span>Ordenar:</span>
              <select
                value={sort}
                onChange={(ev) => {
                  setSort(ev.target.value);
                  setFiltersChanged(true);
                }}
              >
                <option value="price_asc">Preço maior</option>
                <option value="price_desc">Preço menor</option>
              </select>
            </Filter>
            </RevealWrapper>
          </FiltersWrapper>
          )}
          
        </CategoryHeader>
        {loadingProducts && <Spinner fullWidth />}
        {!loadingProducts && (
          <div>
            {products.length > 0 && <ProductsGrid products={products} />}
            {products.length === 0 && (
              <div>Desculpe, nenhum produto encontrado com esses filtros</div>
            )}
          </div>
        )}
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
