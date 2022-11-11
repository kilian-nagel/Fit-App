import React, { Component, useContext } from 'react';

function getSessions(userData){
    const sessions = userData.data.trainings;
    let week,month = 0;
    let total = userData.data.trainings.length();
    let actual_date = new Date();
    let actual_time = Math.floor(actual_date.getTime() / 1000);

    for(let session in sessions){
        let session_date = session.metadata.date;
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

function formatSessionsData(userData){
    const sessionsData = getSessions(userData);
    return `You did ${sessionsData.week} workouts this week. \n
    You did ${sessionsData.total} workouts in total.
    `;
}