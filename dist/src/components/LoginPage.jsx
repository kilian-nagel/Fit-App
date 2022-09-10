import React, { Component } from 'react';
import LoginButton from './loginButton.js'
import LogoutButton from './LogoutButton.js';
import '../style/style.css';
import '../style/loginpage.css'

function LoginPage() {
    return ( 
        <div className="app">
            <section id="home" className="home">
                <h1 className="title">Get in better shape now</h1>
                <p className="text">FitProject help you to organize , plan your sessions.</p>
                <div className="btn-container">
                    <LoginButton>Login</LoginButton>
                    <LogoutButton>Logout</LogoutButton>
                </div>
            </section>
        </div>
    );
}

export default LoginPage;