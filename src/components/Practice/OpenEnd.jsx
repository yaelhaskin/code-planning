import React, { useState, useEffect } from 'react';

import classes from "../../scss/Practice.module.scss";

import cardPattern from "../../assets/svg/cardPatterns/whiteMinimalCardPattern.svg"

const OpenEnd = ({ question, done, setDone }) => {
    const [inputValue, setInputValue] = useState([]);
    const [canClickCompare, setCanClickCompare] = useState(false);
    const [showExplanation, setshowExplanation] = useState(false);
  
    const handleInputChange = (event, part) => {
        const value = event.target.value;

        if (question.curQuestion === "final") {
            setInputValue((prev) => 
                prev.map((obj) => part === Object.keys(obj)[0] ? { [part]: value } : obj)
            );
            setCanClickCompare(inputValue.every((obj) => Object.values(obj)[0] !== ''));
        } else {
            setInputValue(value);
            setCanClickCompare(value.trim() !== "");
        }

        if (done) {
            updateStorage();
        }
    }

    const updateStorage = () => {
        let practiceAnswers = JSON.parse(sessionStorage.getItem("practiceAnswers"));
        let existingAnswerIndex = practiceAnswers.findIndex(answer => answer.question === question.instructions);
        if (existingAnswerIndex !== -1) {
            practiceAnswers[existingAnswerIndex].answer = inputValue;
        } else {
            practiceAnswers.push({
                question: question.instructions,
                answer: inputValue
            });
        }
        sessionStorage.setItem("practiceAnswers", JSON.stringify(practiceAnswers));
    }

    const handleStart = () => {
        if(question.curQuestion === "final") {
            setInputValue([
                {"הקלט": ""},
                {"הפלט": ""},
                {"המגבלות": ""},
                {"החלקים המרכזיים": ""},
                {"תתי הבעיות": ""},
                {"מקרי הקצה": ""},
                {"עברית מבנית": ""}
            ]);
        } else {
            setInputValue("");
        }
    }

    useEffect(() => {
        if(showExplanation) {
            setDone(true);
            updateStorage();
        }
    }, [showExplanation])

    useEffect(() => {
        setCanClickCompare(false);
        setshowExplanation(false);
        if(JSON.parse(sessionStorage.getItem("practiceAnswers"))) {
            if (JSON.parse(sessionStorage.getItem("practiceAnswers")).length > 0) {
                let pastAns = JSON.parse(sessionStorage.getItem("practiceAnswers")).filter((past) => past.question === question.instructions);
                // if answered this question in past
                if (pastAns.length > 0) {
                    setInputValue(pastAns[0].answer);
                    setshowExplanation(true);
                } 
                // if not answered this question in past
                else {
                    handleStart();
                }
            // if not answered any question in past
            } else {
                handleStart();
            }
        // if first time running this page
        } else {
            sessionStorage.setItem("practiceAnswers", JSON.stringify([])); 
        }
    }, [question])

    const answerElements = () => {
        let answersArray = question.correctAnswer.flatMap(Object.keys);
        return inputValue.length > 0 && answersArray.map((part, index) => (
            <div key={part} className={`${classes.finalContainers} ${classes[`area${index}`]}`} style={showExplanation ? {width: "50%"} : null}>
                {part}:
                <div className={classes.finalAnswersContainers}>
                    <textarea type="text" 
                            onChange={(event) => handleInputChange(event, part)} 
                            className={classes.textArea} 
                            value={inputValue[index][part]}
                    ></textarea>
                    {showExplanation && <p className={classes.finalExplination}> {question.correctAnswer[index][`${part}`]} </p>}
                </div>
            </div>
        ))
    }

    return (
        <div className={classes.OpenEnd} style={canClickCompare ? { botton: "15%" } : null}>
            <p> { question.instructions } </p>

            {question.curQuestion === "final" ?
                <div className={classes.openEndFinalContainer} style={showExplanation ? {height: "100%"} : null}>
                    {answerElements()} 
                </div>
                :
                <div className={classes.openEndContainer}>
                    <textarea type="text" value={inputValue} onChange={(event) => handleInputChange(event, "")} className={classes.textArea}></textarea>
                    {(showExplanation || done) && <div className={classes.correctAnswer}>
                        <img src={cardPattern} alt="cardPattern" className={classes.cardPattern}/>
                            <p className={classes.cardPatternText}> { question.correctAnswer } </p>
                    </div>}   
                </div>
            }
            {(canClickCompare && !done) && <div onClick={() => setshowExplanation(true)} 
                                                className={classes.checkBtn} 
                                                style={question.curQuestion === "final" ? { margin: "-2%" } : null }
                                            > הצג פתרון לדוגמה </div>}
            {done && <p className={classes.response}> השוו את הפתרון שלכם לפתרון שבדוגמה </p>}
        </div>
    );
};

export default OpenEnd;