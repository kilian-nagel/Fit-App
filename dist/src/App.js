import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './components/LoginPage.jsx';
import Header from './components/header.jsx';
import Navbar from './components/navbar.jsx';
import Card from './components/card.jsx';
import {HomeSections} from './data/sections';
import {workoutSections} from './data/workoutSections';
import {statsSections} from './data/StatsSections'
import Section from './components/section.jsx';
import './style/sections.css'

function App() {
    const {
        error,
        isAuthenticated,
        isLoading,
        user
    } = useAuth0();   

    const [isLogged,setIsLogged] = useState(false);
    const [userData,setUserData] = useState('');
    const [currentSection,setCurrentSection] = useState('home');
    const [stack,setStack] = useState(['home']);

    const PageSections = {
        'home':HomeSections.map((section,i)=>{return <Section id={section.id} key={i} title={section.title} cards={section.cards} layout={section.layout} changeSection={changeCurrentSection}></Section>}),

        'activity':statsSections.map((section,i)=>{return <Section id={section.id} key={i} title={section.title} cards={section.cards} layout={section.layout} changeSection={changeCurrentSection}></Section>}),

        'workouts':workoutSections.map((section,i)=>{return <Section id={section.id} key={i} title={section.title} cards={section.cards} layout={section.layout} changeSection={changeCurrentSection}></Section>
        }),

        'food':'',

        'training':'',
    }

    function login(){
        if(user){
            console.log('req sent')
            axios.post('http://localhost:5000/auth/login',{
                username : user.nickname,
                uid : user.sub
            })
            .then(()=>{
                setIsLogged(true);
            })
        }
    }
    
    function fetchUserData(){
        if(isLogged){
            axios.get(`http://localhost:5000/auth/getUserData/${user.sub}`)
            .then(data=>{
                setUserData(data.data);
            })
        }
    } 

    function navigateBackward(){
        if(stack.length>1){
            setStack(stack.slice(0,stack.length-1));
        }
    }

    function changeCurrentSection(section){
        setStack(stack.concat(section));
    }

    useEffect(()=>{
        login()
    },[user]);

    useEffect(()=>{
        console.log(stack,stack[stack.length-1])
    })

    useEffect(()=>{
        if(isLogged){
            fetchUserData(user);}
    },[isLogged]);

    const data_to_display = userData && userData.username;

    return (  
        isAuthenticated ?
        <React.Fragment>
            <Navbar user={userData} handleClick={navigateBackward}></Navbar>
            <Header user={userData}></Header>
            {
                PageSections[stack[stack.length-1]]
            }
        </React.Fragment>
        :
        <div>
            <Navbar user={user}></Navbar>
            <LoginPage></LoginPage>
        </div>
    );
}

export default App;