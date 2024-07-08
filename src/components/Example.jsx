import React, { useState, useEffect } from 'react';
import classes from "../scss/Example.module.scss";

import Animations from './Animations';

import clove from "../assets/svg/suits/clove.svg";
import spade from "../assets/svg/suits/spade.svg";
import heart from "../assets/svg/suits/heart.svg";
import dimond from "../assets/svg/suits/dimond.svg";

import carExample from "../assets/svg/examples/carExample.svg";
import starsExample from "../assets/svg/examples/starsExample.svg";

import redCardPattern from "../assets/svg/cardPatterns/redBigCardPattern.svg";
import blueCardPattern from "../assets/svg/cardPatterns/blueBigCardPattern.svg";

import ex from "../assets/svg/ex.svg";
import littleArrow from "../assets/svg/arrows/littleArrow.svg";

const Example = ({ color, title, text, extraText, ani, setCurCard, subtitle }) => {
    let cardPatternObj = {
        red: redCardPattern,
        blue: blueCardPattern
    }
    let cardColorObj = {
        red: '#A01F24',
        blue: '#00004D'
    }
    let suitObj = {
        0: clove,
        1: dimond,
        2: spade,
        3: heart
    }
    let exampleObj = {
        carExampleIMG: carExample,
        starsExampleIMG: starsExample
    }

    let infoArray = text;
    const [infoNum, setInfoNum] = useState(0);
    const [orangeBoxContent, setOrangeBoxContent] = useState("");

    let aniElement = ani.includes("IMG") ? <img src={exampleObj[ani]} alt="ani" className={classes.exampleImg}/> : <Animations ani={ani} playAni={true} controls={true}/> ;

    useEffect(() => {
        setOrangeBoxContent(title.includes("תכנון הפתרון") ? <p> {infoArray[infoNum]} </p> : aniElement);
    }, [infoNum])
    
    useEffect(() => {
        setInfoNum(0);
    }, [])

    const hideRight = {
        visibility: infoNum < 1 ? "hidden" : "visible"
    }
    const hideLeft = {
        visibility: infoNum === infoArray.length - 1 ? "hidden" : "visible"
    }

    return (
        <div className={classes.Example}>
            <div className={classes.bg}></div>
            <div className={classes.exampleContainer}>
                {(infoArray.length === 0 || infoNum === infoArray.length - 1) && <img src={ex} alt="ex" className={classes.ex} onClick={() => setCurCard("")}/>}
                <img src={cardPatternObj[color]} alt="CardPattern" className={classes.cardPattern}/>

                <div className={`${classes.textContainer} ${title.includes("הבנת הבעיה") ? null : classes.bigTextContainer}`} style={{ color: cardColorObj[color] }}>
                    <p className={classes.title}> {title} </p>
                    
                    {title.includes("הבנת הבעיה") ?
                        infoArray.map((text, index) => (
                            <div key={text}>
                                <p className={classes.subtitle}> {extraText[infoNum][index]} </p>
                                <p> {infoArray[infoNum][index]} </p>
                            </div>
                        ))
                        :
                        title === "עברית מבנית בחיים שלנו" ?
                            <p className={classes.scrollbar}>{subtitle}</p>
                            :
                            <div className={classes.text}>
                                <p> {subtitle} </p>
                                {infoArray.map((text, index) => (
                                    <p key={text} className={`${classes.suitContainer} ${infoNum === index ? classes.orangeHighlight : null}`}>
                                        <img src={suitObj[index]} alt="suit" className={classes.suit} />
                                        <p> {extraText[index]} </p>
                                    </p>
                                ))}
                            </div>
                    }
                    
                    <div className={`${classes.orangeBox} ${title.includes("תכנון הפתרון") ? null : classes.bigOrangeBox}`}> {orangeBoxContent} </div>
                
                    {infoArray.length > 1 && <div className={classes.dotsContainer}>
                        <div className={`${classes.arrowArea} ${classes.arrowAreaRight}`} style={hideRight} 
                            onClick={() => setInfoNum((prev) => prev - 1)}>
                                <img src={littleArrow} alt="arrow" className={classes.littleArrow} />
                        </div>
                        <div className={classes.dots}>
                            {infoArray.map((item, index) => {
                                return <div key={index} className={[`${classes.dot} ${index === infoNum && classes.fullOpacity}`]} 
                                            onClick={() => setInfoNum(index)}
                                        ></div>
                            })}
                        </div>
                        <div className={`${classes.arrowArea} ${classes.arrowAreaLeft}`} style={hideLeft}
                            onClick={() => setInfoNum((prev) => prev + 1)}>
                                <img src={littleArrow} alt="arrow" className={classes.littleArrow} />
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Example;
