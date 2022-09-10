import React, { Component } from 'react';
import { useEffect } from 'react';
import '../style/header.css'

function Header({user}) {
    return ( 
        <header id="header">
            <h1 className="title">Hello, {user && user.username}.</h1>
        </header>
    );
}

export default Header;