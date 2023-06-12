import { primary } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  text-decoration: none;
  font-size: 1.2rem;
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  text-size: 5px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  svg {
    height: 16px;
    margin-right: 4px;
  }
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #00bd8e;
      border: 1px solid #00bd8e;
    `}
${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      color: #fff;
      border: 1px solid ${primary}; 
    `}
${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primary};
      padding: 0px;
      svg{
        height: 26px;
      }
      &:hover{
        color: lightblue; 
      }
    `}
${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.5rem;
      padding: 10px 20px;
      svg {
        height: 26px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
