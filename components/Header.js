import Link from "next/link";
import Center from "./Center";
import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/CartIcon";
import Button from "./Button";
import BarsIcon from "./icons/Bars";

const StyledHeader = styled.header`
  background-color: #aaffe2;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled(Link)`
  color: #000;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  display: block;
  transition: all 0.3s ease-in-out;
  color: #00bd8e;
  text-decoration: none;
  position: relative;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  &:hover {
    color: black;
  }
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
  display: block;
  `
      : `
  display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: ease-in-out;
  padding: 50px 20px 20px;
  background-color: #aaffe2;
  @media (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const StyledCart = styled.div`
  left: 50%;
  transform: translateX(-20%);
  transform: translateY(-15%);
`;

const NavButton = styled.button`
   background-color transparent;
   border: none;
   color: #00bd8e;
   cursor: pointer;
   position: relative;
  z-index: 3;
   @media (min-width: 768px) {
    display: none;
   }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>PetFamily</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Início</NavLink>
            <NavLink href={"/products"}>Produtos</NavLink>
            <NavLink href={"/categories"}>Categorias</NavLink>
            <NavLink href={"/account"}>Conta</NavLink>
            <StyledCart>
              <NavLink href={"/cart"}>
                <Button primary="true" outline="true" className="fa">
                  <CartIcon />
                </Button>
                {cartProducts?.length > 0 && (
                  <span className="badge badge-success" id="lblCartCount">
                    {" "}
                    {cartProducts.length}
                  </span>
                )}
              </NavLink>
            </StyledCart>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
