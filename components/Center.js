import styled from "styled-components";


const StyledDiv = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 30px;
`;

export default function Center({children}) {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    )
}