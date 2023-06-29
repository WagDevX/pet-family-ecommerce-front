import styled from "styled-components";
import Center from "./Center";
import { NavLink } from "./Header";

const StyledFooter = styled.footer`
  background-color: #aaffe2;
  margin-top: 20px;
  height: 100%;
`;

const FooterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (min-width: 500px ) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
`;

const StyledLabel = styled.div`
  text-align: center;
  margin-top: 10px;
  padding-bottom: 10px; 
  position: relative;
    font-size: 14px;
`;

const StyledBox = styled.div`
    margin-top: 10px;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: flex-start;
    border-left: 1px solid rgba(0, 0, 0, 0.03);
    img{
      padding-top: 10px;
      position: relative;
      height: 90px;
    }
    }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Center>
        <FooterWrapper>
          <StyledBox>Links úteis
          <NavLink href={"/"}>FAQ</NavLink>
            <NavLink href={"/"}>Sobre Nós</NavLink>
            <NavLink href={"/"}>Cancelamento</NavLink>
            <NavLink href={"/"}>Frete</NavLink>
            <NavLink href={"/"}>Prazos</NavLink>
            <NavLink href={"/"}>Endereços</NavLink>
          </StyledBox>
          <StyledBox>Seções
          <NavLink href={"/"}>Início</NavLink>
            <NavLink href={"/products"}>Produtos</NavLink>
            <NavLink href={"/categories"}>Categorias</NavLink>
            <NavLink href={"/account"}>Conta</NavLink>
            <NavLink href={"/cart"}>Carrinho</NavLink>
            <NavLink href={"/search"}>Busca</NavLink>
          </StyledBox>
          <StyledBox>
            Formas de pagamento
            <img src="https://wagner-nextjs-ecommerce.s3.sa-east-1.amazonaws.com/6220ac4b912013c51947f9c5.png"></img>
          </StyledBox>
        </FooterWrapper>
        <StyledLabel>Copyright&copy; 2023 Desenvolvido por Wagner de Araujo</StyledLabel>
      </Center>
    </StyledFooter>
  );
}
