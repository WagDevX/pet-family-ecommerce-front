import Link from "next/link";
import Center from "./Center";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/CartIcon";
import Button from "./Button";

const StyledHeader = styled.header`
  background-color: #AAFFE2;
`;

const Logo = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  transition: all 0.3s ease-in-out;
  color: #00bd8e;
  text-decoration: none;
  position: relative;
  }
  &:hover {
    color: black;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const StyledCart = styled.div`
  position: flex;
  left: 50%;
  transform: translateX(-20%);
  transform: translateY(-20%);
`;

export default function Header() {
  const {cartProducts} =useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>PetFamily</Logo>
          <StyledNav>
            <NavLink href={"/"}>Início</NavLink>
            <NavLink href={"/products"}>Produtos</NavLink>
            <NavLink href={"/categories"}>Categorias</NavLink>
            <NavLink href={"/account"}>Conta</NavLink>
            <StyledCart>
            <NavLink href={"/cart"}>
            <Button primary='true' outline='true' className="fa"><CartIcon/></Button>
            {cartProducts?.length > 0 && (
              <span className='badge badge-success' id='lblCartCount'> {cartProducts.length}</span>
            )}
            </NavLink>
            </StyledCart>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
