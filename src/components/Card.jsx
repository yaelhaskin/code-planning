import React from 'react';

import classes from "../scss/Card.module.scss"

import heart from "../assets/svg/suits/heart.svg"
import dimond from "../assets/svg/suits/dimond.svg"
import clove from "../assets/svg/suits/clove.svg"
import spade from "../assets/svg/suits/spade.svg"

const Card = ({ children, type, suit, size, className }) => {
    const suitArray = ["heart", "dimond", "clove", "spade"];
    const suitObj = {
        heart: heart,
        dimond: dimond,
        clove: clove,
        spade: spade
    }
    const suitColor = {
        heart: "red",
        dimond: "red",
        clove: "blue",
        spade: "blue"
    }
    const curSuit = type === "img" ? (suit === "any" ? suitArray[Math.floor(Math.random()*(suitArray.length))] : suit) : null;
    const smallCard = size === "smallCard" ? true : false;

    return (
        <div className={`${className} ${classes.singleCard} ${classes[`${suitColor[curSuit]}${size}`]}`} style={suit === "any" ? {} : {textAlign: "center"}}>
            { type === "img" ? 
                <div className={`${classes.suitContainer} ${classes[size]}`}>
                    {!smallCard ? <p className={classes[suitColor[curSuit]]}>A</p> : null}
                    <img src={suitObj[curSuit]} alt='suit'/> 
                </div>
            : 
                <p className={classes.questionMark}> ? </p>
            }

            <p style={smallCard ? { fontSize: "0.7rem" } : null}> {children} </p>
            
            { type === "img" ? 
                <div className={`${classes.suitContainer} ${classes[size]} ${classes.flipSuit}`}>
                    {!smallCard ? <p className={classes[suitColor[curSuit]]}>A</p> : null}
                    <img src={suitObj[curSuit]} alt='suit' /> 
                </div>
            : 
                <p className={`${classes.questionMark} ${classes.flipSuit}`}> ? </p>
            }
        </div>
    );
};

export default Card;