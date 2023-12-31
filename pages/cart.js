import Button from "@/components/Button";
import Center from "@/components/Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import styled from "styled-components";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 20px;
  margin-top: 30px;
  margin-top: 30px;
  min-height: 509px;
  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.4rem;
  }
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 10px 0;
  }

  tr.total td {
    font-weight: bold;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    table tbody tr.subtotal td:nth-child(2) {
      font-size: 1.1rem;
    }
    .price {
      font-size: 12px;
    }
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 1px 2px 2px rgba(25, 50, 47, 0.08),
    0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 5px rgba(18, 71, 52, 0.03);
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
  .btn {
    width: 100%;
    height: 100%;
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
  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

const ProductInfoCell = styled.td`
  align-items: center;
  display: flex;
  gap: 10px;
  padding: 10px 0px;
  @media (max-width: 500px) {
    font-size: 12px;
  }
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
  @media screen and (max-width: 768px) {
    img {
      max-width: 60px;
      max-height: 60px;
    }
  }
`;

const QuantityLabel = styled.span`
  display: flex;
  gap: 2px;
  align-items: center;
  text-align: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: grid;
    font-size: 13px;
    .btn {
      font-size: 13px;
    }
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const { data: session } = useSession();
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
  const [shippingFee, setShippingFee] = useState(null);

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
  }, [session]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get("/api/settings?name=shippingFee").then((response) => {
      setShippingFee(response.data.value);
    });
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfthisProduct(id) {
    removeProduct(id);
  }
  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    productsTotal += price;
  }

  async function goToPayment() {
    if (name.trim() === "") {
      alert("Digite seu nome!");
      return;
    }
    if (name.trim() === "") {
      alert("Digite seu email!");
      return;
    }
    if (city.trim() === "") {
      alert("Digite sua cidade!");
      return;
    }
    if (zipCode.trim() === "") {
      alert("Digite seu CEP!");
      return;
    }
    if (state.trim() === "") {
      alert("Digite seu estado!");
      return;
    }
    if (district.trim() === "") {
      alert("Digite seu bairro!");
      return;
    }
    if (streetAddress.trim() === "") {
      alert("Digite seu endereço!");
      return;
    }
    if (complement.trim() === "") {
      alert("Digite seu complemento!");
      return;
    }
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
  } else
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
                        <tr key={product._id}>
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
                                className="btn"
                                onClick={() => lessOfthisProduct(product._id)}
                              >
                                -
                              </Button>
                              {
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                              <Button
                                className="btn"
                                onClick={() => moreOfThisProduct(product._id)}
                              >
                                +
                              </Button>
                            </QuantityLabel>
                          </td>
                          <td className="price">
                            R$
                            {(
                              cartProducts.filter((id) => id === product._id)
                                .length * product.price
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr className="subtotal">
                        <td colSpan={2}>Produtos</td>
                        <td>R${productsTotal.toFixed(2)}</td>
                      </tr>
                      <tr className="subtotal">
                        <td colSpan={2}>Frete</td>
                        <td>R${parseInt(shippingFee).toFixed(2)}</td>
                      </tr>
                      <tr className="total subtotal">
                        <td colSpan={2}>Total</td>
                        <td>
                          R${(productsTotal + parseInt(shippingFee)).toFixed(2)}
                        </td>
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
