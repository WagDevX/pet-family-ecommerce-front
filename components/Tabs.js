import { primary } from "@/lib/colors";
import styled from "styled-components";
import HeartSolidIcon from "./icons/HeartSolidIcon";

const StyledTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;
const StyledTab = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right,#000, #000 50%, #999 50%);
  background-size: 200% 100%;
  background-position: -100%;
  ${(props) =>
    props.active
      ? `
        background-position: 0;
    `
      : `
       color: #999;
    `}
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
    background-color: black;
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
export default function Tabs({ tabs, active, onChange }) {
  return (
    <StyledTabs>
      {tabs.map((tabName) => (
        <StyledTab
          onClick={() => {
            onChange(tabName);
          }}
          active={tabName === active}
        >
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
}
