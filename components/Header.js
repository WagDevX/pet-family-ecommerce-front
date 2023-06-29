import Link from "next/link";
import Center from "./Center";
import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/CartIcon";
import Button from "./Button";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";
import { primary } from "@/lib/colors";
import { TbPawFilled } from 'react-icons/tb'

const StyledHeader = styled.header`
  background-color: #aaffe2;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled(Link)`
  color: ${primary};
  text-decoration: none;
  position: relative;
  z-index: 10;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  transition: all 0.5s ease-in-out;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(
    to right,
    #000,
    #000 50%,
    ${primary} 50%
  );
  background-size: 200% 100%;
  background-position: -100%;
  min-width: 30px;
  display: block;
  transition: all 0.5s ease-in-out;
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
  svg {
    height: 20px;
  }
  &:hover {
    background-position: 0;
  }
  {
    position: relative;
  }

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: #000;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.5s ease-in-out;
  }

  :hover::before {
    transform-origin: left;
    transform: scaleX(1);
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
  transform: translateY(0%);
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
const SideIcons = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  a {
    display: inline-block;
    min-width: 20px;
    color: ${primary};
  }
  svg {
    width: 22px;
    height: 22px;
  }
`;

const LogoWrapper = styled.div`
    color: ${primary};
    display: flex;
    z-index: 10;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <LogoWrapper>
          <TbPawFilled size="1.5em"/>
          <Logo href={"/"}>PetFamily</Logo>
          </LogoWrapper>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Início</NavLink>
            <NavLink href={"/products"}>Produtos</NavLink>
            <NavLink href={"/categories"}>Categorias</NavLink>
            <NavLink href={"/account"}>Conta</NavLink>
          </StyledNav>
          <SideIcons>
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
            <NavLink href={"/search"}>
              <SearchIcon />
            </NavLink>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
