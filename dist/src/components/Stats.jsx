import React, { Component } from 'react';
import { statsSections } from '../data/statsSections';
import Header from './header';
import Section from './section';

function Stats() {
    const sections = statsSections.map((section,i)=>{return <Section id={section.id} key={i} title={section.title} cards={section.cards} layout={section.layout}></Section>});

    
    return ( 
        <React.Fragment>
            <Header/>
            {sections}
        </React.Fragment>
    );
}

export default Stats;