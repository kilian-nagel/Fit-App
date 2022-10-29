import React, { Component } from 'react';
import { useEffect } from 'react';
import '../style/header.css'

function Header({user,text}) {
    return ( 
        <header id="header">
            <h1 className="title">{text && text}</h1>
        </header>
    );
}

export default Header;