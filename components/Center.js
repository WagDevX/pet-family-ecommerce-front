import styled from "styled-components";


const StyledDiv = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
    @media (max-width: 420px) {
        grid-template-columns: 1fr 1fr;
        padding: 0 10px;
    }
`;

export default function Center({children}) {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    )
}