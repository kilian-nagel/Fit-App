import React, { Component, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './components/LoginPage.jsx';
import Navbar from './components/navbar.jsx';
import Training from './components/training.jsx';
import Home from './components/home.jsx';
import Trainings from './components/trainings.jsx';
import {workoutSections} from './data/workoutSections';
import { userContext } from './hooks/userContext.js';
import './style/sections.css';

function App() {
    const {
        isAuthenticated,
        user
    } = useAuth0();   

    const [userData,setUserData] = useState({});
    const [isLogged,setIsLogged] = useState(false);
    const [sectionsStack,setSectionsStack] = useState(['home']);
    const [currentTrainingIndex,setCurrentTrainingIndex] = useState('');
    const [training,setTraining] = useState({});
    
    const PageSections = {

        'food':[0].map(x=>{return <Training key={0}></Training>}),

        'training':[0].map(x=>{return <Training training={training} handleTrainingEnd={()=>{handleTrainingEnd()}}></Training>}),
    }

    /* Handlers 
    =============== */

    function handleTrainingEnd(){
        //updateUserDataTrainings(userData,training);
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
            fetchUserData(userData,setUserData);
        }
    },[isLogged]);

    useEffect(()=>{
        if(Number.isFinite(currentTrainingIndex)){getTrainingByIndex(currentTrainingIndex);}
    },[currentTrainingIndex]);

    return (
        isAuthenticated ?
        <div className="app">
            <userContext.Provider value={{user,setUserData}}>
                <BrowserRouter>
                <Navbar></Navbar>
                    <Routes>
                        <Route path="/" element={<Home/>}>
                        </Route>
                        <Route path="/trainings" element={<Trainings/>}/>
                            <Route path="stats"/>
                            <Route path="recipes"/>
                        </Routes>
                </BrowserRouter>
            </userContext.Provider>
        </div>
            :
        <div className="app">
            <Navbar />
            <LoginPage />
        </div>
    );
}

function login(user,setIsLogged){
    if(user){
        axios.post('http://localhost:5000/auth/login',{
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
        axios.post('http://localhost:5000/user/getUserData',{
            uid:user.sub
        })
        .then(data=>{
            setUserData(user)
        })
    }
}

export default App;