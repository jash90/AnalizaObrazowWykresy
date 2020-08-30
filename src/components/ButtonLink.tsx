import React from 'react';
import { Link } from 'react-router-dom';
import { LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    height: 100px;
    width: 25%;
    background-color: gray;
    border: 0;
    padding: 0;
    font-size: 12px;
    text-decoration: none;
    &:hover{
        background-color: white;
        color: black;
    }
`;

const linkStyle = { textDecoration: "none", color: "black", justifyContent: "center", };

export const ButtonLink: React.FC<LinkProps> = (props: LinkProps) => {
    return (
        <Button><Link {...props} style={linkStyle} /></Button>
    );
}