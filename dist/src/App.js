import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './components/loginPage.jsx';
import Navbar from './components/navbar.jsx';
import Header from './components/header.jsx';
import Section from './components/section.jsx';
import Training from './components/training.jsx';
import {HomeSections} from './data/sections';
import {workoutSections} from './data/workoutSections';
<<<<<<< HEAD
import {statsSections} from './data/statsSections';
import './style/sections.css';

=======
import {statsSections} from './data/statsSections'
import {updateUserDataTrainings} from './data/userDataController.js';
import './style/sections.css'
>>>>>>> 24b5a33e8875af94896f637a62bf57378d72201b

function App() {

    /* Init
    =============== */

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

    const PRIVATE_KEY = 'ca9cd68c-1107-40f3-b232-0c692a94f31f';
    const PUBLIC_KEY = 'fpdbxmpy';
    
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

    /* Endpoint functions
    ==================== */ 

    function login(){
        if(user){
            axios.post('http://localhost:5000/auth/login',{
                username : user.nickname,
                uid : user.sub
            })
            .then(()=>{
                setIsLogged(true);
            })
            .catch((err)=>{
                throw err;
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

    useEffect(()=>{
        login()
    },[user]);

    useEffect(()=>{
        if(isLogged){
            fetchUserData(user);}
    },[isLogged]);

    useEffect(()=>{
        if(Number.isFinite(currentTrainingIndex)){
            getTrainingByIndex(currentTrainingIndex);
        }
    },[currentTrainingIndex])

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

export default App;