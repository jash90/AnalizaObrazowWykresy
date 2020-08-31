import React from 'react';
import { Link } from 'react-router-dom';
import { LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    height: 70px;
    width: 25%;
    background-color: #808080;
    border: 0px;
    padding: 0px;
    font-size: 12px;
    text-decoration: none;
    &:hover{
        background-color: #80808099;
        color: black;
    }
`;

const linkStyle = { textDecoration: "none", color: "black", justifyContent: "center", height:"100%", padding:10 };

export const ButtonLink: React.FC<LinkProps> = (props: LinkProps) => {
    return (
        <Button><Link {...props} style={linkStyle} /></Button>
    );
}