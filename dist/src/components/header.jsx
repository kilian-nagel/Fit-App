import React, { Component } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { userContext } from '../hooks/userContext';
import '../style/header.css';

function Header({text}) {
    const {user,setUser} = useContext(userContext);
    return ( 
        <header id="header">
            <h1 className="title">Hello, {user && user.nickname}</h1>
        </header>
    );
}

export default Header;