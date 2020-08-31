import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const ContainerColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
`;

const Header = styled.div`
    background-color: black;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const Title = styled.span`
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 50px;
`;

const Navigation = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const ChartContainer = styled.div`
    display: flex;
    width: 100%;
    height: 550px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%; 
    padding: 10px; 
    justify-content: space-evenly;
    align-items: center;
`;

export { Container, ContainerColumn, Header, Title, Navigation, ChartContainer, InputContainer };