
import React, { Component } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import '../style/navbar.css'

function Navbar({user,handleClick}) {
    const [profileDisplay,setProfileDisplay] = useState('none');

    function changeDisplayUserProfille(){
        if(profileDisplay==='flex'){
            setProfileDisplay('none');
        }
        else {
            setProfileDisplay('flex');
        }
    }

    return ( 
        <header id="main-header" className='header'>
            <p className="title">FitProject</p>
            <div className="btn-container">
                <p onClick={handleClick}>back</p>
            </div>
            <nav className='nav' style={{position:'relative'}}>
                <div className='btn-user btn' onClick={changeDisplayUserProfille} style={{position:'relative'}}>
                    <i className="btn btn-user fa-solid fa-user"></i>
                    <div className="profile" style={{display:profileDisplay,position:'absolute',marginTop:10,right:0}}>
                        <p className='username'>{user ? user.username : 'guest'}</p>
                        <button className='btn btn-profile'>your profile</button>
                        <button className='btn btn-logout'>logout</button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;