import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import styled from "styled-components";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 20px;
  margin-top: 30px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 1px 2px 2px rgba(25, 50, 47, 0.08),
    0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 5px rgba(18, 71, 52, 0.03);
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const CheckoutBox = styled.div`
  background-color: #fff;
  min-height: 375px;
  height: 375px;
  padding: 15px;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 1px 2px 2px rgba(25, 50, 47, 0.08),
    0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 5px rgba(18, 71, 52, 0.03);
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ProductInfoCell = styled.td`
  align-items: center;
  display: flex;
  gap: 10px;
  padding: 10px 0px;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  margin-bottom: 3px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
  text-align: center;
  @media (max-width: 768px) {
    display: grid;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const {data:session} = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
        
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get("/api/address").then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setZipCode(response.data.zipCode);
      setState(response.data.state);
      setDistrict(response.data.district);
      setStreetAddress(response.data.streetAddress);
      setComplement(response.data.complement);
    });

  }, [session])

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfthisProduct(id) {
    removeProduct(id);
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      zipCode,
      state,
      district,
      streetAddress,
      complement,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Obrigado pela sua compra!</h1>
              <p>Enviaremos um email com mais informações.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <h2>Carrinho</h2>
              {!cartProducts?.length && <div>Seu carrinho está vazio</div>}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product) => (
                      <tr>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img
                              src={product.images[0]}
                              alt={product.title}
                            ></img>
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <QuantityLabel>
                            <Button
                              onClick={() => lessOfthisProduct(product._id)}
                            >
                              -
                            </Button>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                            <Button
                              onClick={() => moreOfThisProduct(product._id)}
                            >
                              +
                            </Button>
                          </QuantityLabel>
                        </td>
                        <td>
                          R$
                          {(
                            cartProducts.filter((id) => id === product._id)
                              .length * product.price
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>R${total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
              {products?.length > 0 && (
                <Button onClick={clearCart} block="true" primary="true">
                  Limpar carrinho
                </Button>
              )}
            </Box>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            {!!cartProducts?.length && (
              <CheckoutBox>
                <h2>Finalizar compra</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="Cidade"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="CEP"
                    value={zipCode}
                    name="zipCode"
                    onChange={(ev) => setZipCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Estado"
                  value={state}
                  name="state"
                  onChange={(ev) => setState(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Bairro"
                  value={district}
                  name="district"
                  onChange={(ev) => setDistrict(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Endereço ex: R. Augusta, 145"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Complemento ex: Apt 10"
                  value={complement}
                  name="complement"
                  onChange={(ev) => setComplement(ev.target.value)}
                />
                <Button onClick={goToPayment} block="true" primary="true">
                  Ir para pagamento
                </Button>
              </CheckoutBox>
            )}
          </RevealWrapper>
        </ColumnsWrapper>
      </Center>
    </>
  );
}
