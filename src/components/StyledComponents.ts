import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
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
    align-items: flex - end;
    width: 100%;
`;

export {Container, Header, Title, Navigation};