import React, { useEffect, useState } from 'react';

import classes from "../../scss/Practice.module.scss";

import heart from "../../assets/svg/suits/heart.svg"
import dimond from "../../assets/svg/suits/dimond.svg"

import Card from "../Card"

const Select = ({ question, done, setDone }) => {
    let questionsArray = question.questions;
    let questionsArrayElements = questionsArray;
    const [curQuestion, setCurQuestion] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleClick = (btn) => {
        setClicked(true);
        if (questionsArray[curQuestion].correctAnswer === btn) {
            setIsCorrect(true);
            setCurQuestion((prev) => prev + 1);
            if (curQuestion === questionsArray.length - 1) {
                setDone(true);
            }
        } else {
            setIsCorrect(false);
        }
    }

    useEffect(() => {
        setClicked(false);
        setIsCorrect(false);
    }, [curQuestion])

    useEffect(() => {
        if(done) {
            setClicked(true);
            setCurQuestion(questionsArray.length)
        } else {
            setCurQuestion(0);
        }
    }, [done])

    const suitElements = (text) => (
        <div className={classes.container}>
            <div className={classes.suitBtn} onClick={() => handleClick(text)} style={text === "קלט" ? { alignSelf: "flex-end"} : {}}>
                <p>{text}</p>
                <img src={text === "קלט" ? heart : dimond} alt="suit" />
            </div>
            <div className={classes.correctCardsContatiner}>
                {questionsArrayElements.filter((question, index) => index < curQuestion && question.correctAnswer === text).map((card, i) => (
                    <Card key={i} className={classes.smallCard} type={"img"} suit={text === "קלט" ? "heart" : "dimond"} size={"smallCard"}> { card.answer } </Card>
                ))}
            </div>
        </div>
    )

    return (
        <div className={classes.Select}>
            {!done && <p className={classes.instructions}> { questionsArray[curQuestion].instructions } </p>}

            <div className={classes.suitBtnContainer}>
                {suitElements("קלט")}
                {!done ? 
                    <Card className={classes.Card} type={"text"} suit={null} size={"bigCard"}> { questionsArray[curQuestion].answer } </Card>
                    :
                    <div className={classes.Card}></div>
                }
                {suitElements("פלט")}
            </div>
            {clicked && <p className={classes.response} 
                            style={{ bottom: done? "0%" : "-5%" }}
                        > {done ? "סיימתם! יפה מאוד" : (!isCorrect && `טעות, נסו שוב\n${questionsArray[curQuestion].explanation}` )}</p>
            }
        </div>
    );
};

export default Select;