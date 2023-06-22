import { primary } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  transition: 0.5s ease;
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
  justify-content: center;
  svg {
    height: 16px;
    margin-right: 4px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
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
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
    ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      color: #fff;
      border: 1px solid ${primary};
      &:hover {
        background-color: white;
        color: black;
      }
    `}
${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primary};
      padding: 0px;
      font-size: 25px;
      svg {
        height: 26px;
      }
      &:hover {
        background-color: white;
        color: black;
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
