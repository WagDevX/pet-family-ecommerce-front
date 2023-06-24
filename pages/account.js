import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import Spinner from "@/components/Spinner";

const ColsWrapper = styled.div`
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

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function AccountPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { data: session } = useSession();
  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  function SaveAddress() {
    const data = {
      name,
      email,
      city,
      zipCode,
      state,
      district,
      streetAddress,
      complement,
    };
    axios.put("/api/address", data);
  }
  useEffect(() => {
    setTimeout(() => {
      axios.get("/api/address").then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setCity(response.data.city);
        setZipCode(response.data.zipCode);
        setState(response.data.state);
        setDistrict(response.data.district);
        setStreetAddress(response.data.streetAddress);
        setComplement(response.data.complement);
        setLoaded(true);
      });
    }, 500);
  }, []);
  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <Box>
                <h2>Lista de desejos</h2>
              </Box>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <Box>
                <h2>Minha conta</h2>
                {!loaded && <Spinner fullWidth={true} />}

                {loaded && (
                  <>
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
                    <Button onClick={SaveAddress} block="true" primary="true">
                      Salvar dados
                    </Button>
                    
                  </>
                )}
                <hr />
                {session && (
                  <Button primary="true" onClick={logout}>
                    Deslogar
                  </Button>
                )}
                {!session && (
                  <Button primary="true" onClick={login}>
                    Entrar
                  </Button>
                )}
              </Box>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}
