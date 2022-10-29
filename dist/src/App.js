import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './components/LoginPage.jsx';
import Navbar from './components/navbar.jsx';
import Header from './components/header.jsx';
import Section from './components/section.jsx';
import Training from './components/training.jsx';
import {HomeSections} from './data/sections';
import {workoutSections} from './data/workoutSections';
import {statsSections} from './data/StatsSections'
import {updateUserDataTrainings} from './data/userDataController.js';
import './style/sections.css';

function App() {
    const {
        isAuthenticated,
        user
    } = useAuth0();   

    const [isLogged,setIsLogged] = useState(false);
    const [userData,setUserData] = useState('');
    const [sectionsStack,setSectionsStack] = useState(['home']);
    const [currentTrainingIndex,setCurrentTrainingIndex] = useState('');
    const [training,setTraining] = useState({});
    const [headerText,setHeaderText] = useState(`Hello, ${userData.username}.`);
    
    const headerTextHashMap = {
        'home':`Hello, ${userData.username && userData.username}.`,
        'activity':'stats',
        'workouts':'workouts',
        'training':`${training && training.title}`,
    }
    
    const PageSections = {
        'home':HomeSections.map((section,i)=>{return <Section id={section.id} key={i} title={section.title} cards={section.cards} layout={section.layout} changeSection={changeCurrentSection}></Section>}),

        'activity':statsSections.map((section,i)=>{return <Section id={section.id} key={i} title={section.title} cards={section.cards} layout={section.layout} changeSection={changeCurrentSection}></Section>}),

        'workouts':workoutSections.map((section,i)=>{return <Section id={section.id} key={i} title={section.title} cards={section.cards} layout={section.layout} changeSection={changeCurrentSection} changeTraining={changeTraining}></Section>
        }),

        'food':[0].map(x=>{return <Training key={0}></Training>}),

        'training':[0].map(x=>{return <Training training={training} handleTrainingEnd={()=>{handleTrainingEnd()}}></Training>}),
    }

    /* Handlers 
    =============== */

    function handleTrainingEnd(){
        console.log('hello');
        updateUserDataTrainings(userData,training);
    }

    /* Handling navigation between different sections of the web page 
    =============== */

    function gotoPreviousSection(){
        // if we're not already at home section , then we can go to the previous section.
        if(sectionsStack.length>1){
            setSectionsStack(sectionsStack.slice(0,sectionsStack.length-1));
        }
    }

    function changeCurrentSection(section){
        setSectionsStack(sectionsStack.concat(section));
    }

    /* Set exercises for the current training session
    =============== */

    function changeTraining(uid){
        setCurrentTrainingIndex(uid);
    }

    function getTrainingByIndex(index){
        if(!Number.isFinite(index)){return ''}
        workoutSections.map(workoutType=>{
            workoutType.cards.map(workout=>{
                if(workout.uid===currentTrainingIndex){
                    setTraining(workout);
                }
            })
        })
        return 0;
    }

    useEffect(()=>{
        login(user,setIsLogged);
    },[user]);

    useEffect(()=>{
        if(isLogged){
            fetchUserData(user,setUserData);
        }
    },[isLogged]);

    useEffect(()=>{
        if(Number.isFinite(currentTrainingIndex)){getTrainingByIndex(currentTrainingIndex);}
    },[currentTrainingIndex]);

    return (  
        isAuthenticated ?
        <div id="app">
            <Navbar user={userData} handleClick={gotoPreviousSection}></Navbar>
            <Header user={userData} text={headerTextHashMap[sectionsStack[sectionsStack.length-1]]}></Header>
            {
                PageSections[sectionsStack[sectionsStack.length-1]]
            }
        </div>
        :
        <div>
            <Navbar user={user}></Navbar>
            <LoginPage></LoginPage>
        </div>
    );
}

function login(user,setIsLogged){
    if(user){
        axios.post('http://localhost:5000/database/login',{
            username:user.nickname,
            uid:user.sub
        })
        .then(response=>{
            setIsLogged(true);
        })
        .catch(err=>{
            throw err;
        });
    }
}

function fetchUserData(user,setUserData){
    if(user){
        axios.post('http://localhost:5000/database/getUserData',{
            uid:user.sub
        })
        .then(data=>{
            console.log(data.data);
            setUserData(data.data);
        })
    }
}

export default App;