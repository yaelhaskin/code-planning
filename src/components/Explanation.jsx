import React, { useEffect, useState } from 'react';
import classes from "../scss/Explanation.module.scss";

import Animations from './Animations';
import Card from "./Card"

import cardDeckBlue from "../assets/svg/cardDeckBlue.svg"
import cardDeckRed from "../assets/svg/cardDeckRed.svg"
import arrow from "../assets/svg/arrows/bluePlanningArrow.svg"

const Explanation = ({ curPage, title, text, ani, explainCards, explanation, visitedCurPage, handleArrows }) => { 
    const suitArray = ["heart", "clove", "dimond", "spade"];

    const [cardsState, setCardsState] = useState([
        {flipped: false},
        {flipped: false},
        {flipped: false},
        {flipped: false}
    ]);

    const handleFlip = (cardIndex) => {
        if (cardIndex === 0 || cardsState[cardIndex - 1][`flipped`]) {
            setCardsState((prevCards) => 
                prevCards.map((card, index) => 
                    cardIndex === index ? 
                    { ...card, flipped: true } 
                    : 
                    card
                )
            );
        } 
    };

    useEffect(() => {
        if (title === "תכנון הפתרון" && cardsState[cardsState.length - 1][`flipped`]) {
            handleArrows(true, true, "explination");
        }
    }, [cardsState])

    useEffect(() => {
        if (title === "תכנון הפתרון") {
            if(visitedCurPage) {
                setCardsState((prev) => prev.map(() => ({ flipped: true })));
            }
        } else {
            handleArrows(true, true, "explination");
        }
    }, [title, visitedCurPage])

    const mergedArrayElements = () => {
        let mergedArray = [];
        if (explainCards) {
            for (let i = 0; i < explainCards.length; i++) {
                mergedArray.push(explainCards[i]);
                i === explainCards.length - 1 ? null : mergedArray.push("arrow");
            }
        }
        return mergedArray;
    }

    return (
        <div className={classes.Explanation}>
            <div className={classes.textContainer}>
                {title && <p className={classes.title }> {title} </p>}
                {!explainCards ? 
                    <div>
                        {ani ? 
                            <div className={classes.aniContainer}>
                                <Animations ani={ani} playAni={true} controls={true}/>
                            </div>
                        :
                            <>
                                <Card className={classes.cardContainer} type={"img"} suit={"any"} size={"bigCard"}> { text } </Card>
                                <img src={curPage  % 2 === 1 ? cardDeckBlue : cardDeckRed} alt='cardDeck' className={classes.cardDeck} />
                            </>
                        }
                    </div>
                :
                    <div style={{ height: "100%"}}>
                        <p> {text} </p>
                        <div className={classes.allCardsContainer}>
                            {mergedArrayElements().map((card, index) => card === "arrow" ? 
                                <img key={index} src={arrow} alt="arrow" className={classes.arrow}/>
                                :
                                <div key={index} 
                                    className={`${classes.singleCard} ${cardsState[(index / 2)].flipped ? classes.flipped : null}`} 
                                    onMouseEnter={() => handleFlip(index / 2)}
                                >
                                    <div className={`${classes.singleCardFlip} 
                                                    ${classes.front} 
                                                    ${(index / 2) % 2 === 0 ? classes.red : classes.blue}`
                                                }></div>
                                    <Card className={`${classes.singleCardFlip} ${classes.back}`} 
                                        type={"img"} 
                                        suit={suitArray[index / 2]} 
                                        size={"mediumCard"}
                                    > { card } </Card>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>
            {explanation && <p className={classes.explanation}> {explanation} </p>}
        </div>
    );
};

export default Explanation;