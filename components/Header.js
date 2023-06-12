import Link from "next/link";
import Center from "./Center";
import styled from "styled-components";

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
  color: #00bd8e;
  text-decoration: none;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;
export default function Header() {
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>PetFamily</Logo>
          <StyledNav>
            <NavLink href={"/"}>Início</NavLink>
            <NavLink href={"/produtos"}>Produtos</NavLink>
            <NavLink href={"/categorias"}>Categorias</NavLink>
            <NavLink href={"/conta"}>Conta</NavLink>
            <NavLink href={"/carrinho"}>Carrinho (0)</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
