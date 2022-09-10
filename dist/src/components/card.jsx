
import React, { Component } from 'react';
import { useEffect } from 'react';
import '../media/strength.jpg'

function Card({name,title,bgColor,bgImage,content,icon,changeSection}) {
    const hasBgImg = bgImage ? 'linear-gradient(to bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.45))' : '';
    let style = {
        color:'white',
        backgroundColor:bgColor,
        backgroundImage:`${hasBgImg} , url(${bgImage})`,
        backgroundPosition:'center',
        backgroundSize:'cover',
    }
    return ( 
        <div className={name+' card '} style={style} onClick={()=>changeSection()}>
            <h2 className="title"><span className={'icon '+icon}></span> {title}</h2>
            <div className="content">
                <p className="text">{content}</p>
                <img src="" alt="" className="image" />
            </div>
        </div>
    );
}

export default Card;