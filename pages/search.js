import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.5rem;
  outline: none;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
`;

const InputWrapper = styled.div`
  position: sticky;
  width: 100%;
  height: 41px;
  top: 90px;
  margin: 25px 0;
  padding: 10px 0;
  z-index: 1;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);
  function searchProducts(phrase) {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }
  return (
    <>
      <Header />
      <Center>
        <InputWrapper>
        <RevealWrapper delay={0}>
          <SearchInput
            onChange={(ev) => setPhrase(ev.target.value)}
            autoFocus={true}
            placeholder="Procure pelo nome do produto..."
          />
          </RevealWrapper>
        </InputWrapper>
        {!isLoading && phrase !== "" && products.length === 0 && (
          <h1>Nenhum produto encontrado para "{phrase}"</h1>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}
