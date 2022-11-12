import React, { Component, useContext } from 'react';

export const getStatsData = {
    sessions:function (userData){
        if(userData !== undefined && userData !== null && userData !== {}){
            const sessionsData = getSessions(userData);
            return `You did ${sessionsData.week} workouts this week.
            You did ${sessionsData.total} workouts in total.
            `;
        } else {
            return 'no data.'
        }
    },
    exercises:function(userData){
        return 'a';
    },
    progression:function(userData){
        console.log(userData)
        return 'a';
    }
}

function getSessions(userData){
    console.log(userData);
    const sessions = userData.data.trainings;
    let month = 0;
    let week = 0;
    let total = userData.data.trainings.length;
    let actual_date = new Date();
    let actual_time = Math.floor(actual_date.getTime() / 1000);

    for(let session in sessions){
        let session_date = sessions[0].metadata.date;
        session_date = new Date(session_date);
        console.log(session_date);
        session_date = Math.floor(session_date.getTime() / 1000);
        let seconds_in_a_week = 86400*7;
        if(actual_time-seconds_in_a_week<=session_date){
            week += 1;
        }
    }

    return {
        'week':week,
        'month':month,
        'total':total
    };
}