import React, { useEffect, useState } from 'react';
import classes from "../scss/ExampleCards.module.scss";

import Example from "./Example";

const ExampleCards = ({ title, exampleCards, text, explanation, setShowArrows, visitedCurPage, handleArrows }) => {
    let cardColorObj = {
        red: '#A01F24',
        blue: '#00004D',
        white: '#FFFFEE'
    }

    const [curCard, setCurCard] = useState("");
    const [visited, setVisited] = useState([]);
    
    const handleCardClick = (card) => {
        setCurCard(card); 
        setVisited((prev) => [...prev, card.exampleType]);
    }

    useEffect(() => {
        setShowArrows(curCard === "" ? true : false);
    }, [curCard])
    
    useEffect(() => {
        if (visited.includes("בקוד") && visited.includes("בחיים שלנו")) {
            handleArrows(true, true, "exampleCards");
        }
    }, [visited])

    useEffect(() => {
        if (visitedCurPage) {   
            setVisited(["בקוד", "בחיים שלנו"]);
        } else {
            setCurCard("");
            setVisited([]);
        }
    }, [title, visitedCurPage])

    return (
        <div className={classes.ExampleCards}>
            <p className={classes.title}> {title} </p>
            <div className={classes.cardContainer}>
                {exampleCards.map((card) => 
                    <div key={card.exampleType}
                        className={`${classes.pattern} ${visited.includes(card.exampleType) ? classes[`${card.exampleColor}`] : null}`} 
                        style={{backgroundColor: visited.includes(card.exampleType) ? cardColorObj["white"] : cardColorObj[card.exampleColor]}}
                        onClick={() => handleCardClick(card)}
                    >{card.exampleType}</div> 
                )}
            </div>
            <p className={classes.explanation}> {explanation} </p>

            {curCard !== "" && <Example style={{ zIndex: "2"}} 
                                    color={curCard.exampleColor} 
                                    title={curCard.title} 
                                    text={curCard.text} 
                                    extraText={text} 
                                    ani={curCard.ani}
                                    setCurCard={setCurCard}
                                    subtitle={curCard.subtitle}
                                />
            }
        </div>
    );
};

export default ExampleCards;