import React, { useEffect, useState } from 'react';
import classes from "../scss/Title.module.scss";

import Animations from './Animations';

import logo from "../assets/svg/logo.svg"
import ex from "../assets/svg/ex.svg";

import cardPile from "../assets/svg/about/cardPile.svg"
import card1 from "../assets/svg/about/aboutCard1.svg"
import card2 from "../assets/svg/about/aboutCard2.svg"
import arrow from "../assets/svg/arrows/titleArrow.svg"

const Title = ({ title, text, btns, ani, setCurPage, setShowArrows }) => {
    const [playAni, setPlayAni] = useState(false);
    const [fade, setFade] = useState(false);

    const handleBtnClick = (text) => {
        if (text.includes("התחלה")) {
            setPlayAni(true);

            setTimeout(() => {
                setFade(true);
            }, 1000);
            
            setTimeout(() => {
                setCurPage(1);
            }, 1450);

        } else if (text === "אודות") {
            setCurPage(23);
        }
    }

    useEffect(() => {
        setPlayAni(false);
        setFade(false);
        setShowArrows(false);
    }, [])

    return (
        <div className={`${classes.Title} ${fade && classes.fadeToBlack}`} >
            {title === "" ? <>
                    <img src={cardPile} alt="cardPile" className={classes.cardPile}/>
                    <img src={ex} alt="ex" className={classes.ex} onClick={() => setCurPage(22)}/>

                    <div className={classes.aboutCards}>
                        <img src={card1} alt='card' />
                        <img src={card2} alt='card' />
                    </div>
                </>
            :
                <div className={classes.textContainer}>
                    <p className={classes.title}> {title} </p>
                    {text && <p className={classes.text}> {text} </p>}
                    {btns.map((text, index) => (
                        <div key={text} className={[`${classes.btn} ${classes[`btn${index}`]}`]} onClick={() => handleBtnClick(text)} >
                            <img src={arrow} alt='arrowLeft' />
                            <p> {text} </p>
                            <img src={arrow} alt='arrowRight' className={classes.arrowRight} />
                        </div>
                    ))}
                </div>    
            }
            
            <img src={logo} 
                alt='logo' 
                className={`${classes.logo} ${title === "" ? classes.logoBg : null}`} 
                onClick={() => setCurPage((prev) => prev === 0 ? 23 : 0)}
            />
            {ani && <Animations ani={ani} playAni={playAni} controls={false}/>}            
        </div>
    );
};

export default Title;