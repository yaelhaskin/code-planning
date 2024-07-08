import React, {useEffect, useState} from 'react';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//dnd components
import Dropzone from "./Dropzone";
import DragItem from "./DragItem";

import classes from './DragNDrop.module.scss'

import arrow from "../../../assets/svg/arrows/whitePlanningArrow.svg"
import planningCheatSheet from "../../../assets/svg/examples/planningCheatSheet.svg"

const DragNDrop = ({ question, done, setDone }) => {
    const dropzoneArray = question.columns;
    const dragMulti = question.dragMulti;
    const [dragItems, setDragItems] = useState(question.terms);
    const [isStartEmpty, setIsStartEmpty] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [correct, setCorrect] = useState(0);
    
    const handleDrop = (itemName, dropzoneName) => {
        setDragItems((prev) => (
            prev.map((object) => (
                object.item === itemName.itemName ? 
                {
                    ...object,
                    curAnswer : dropzoneName
                }
                :
                object
            ))
        ))
    }

    const handleSubmit = (text) => {
        if (text === "הצג תשובות") {
            setDragItems((prev) => (
                prev.map((object) => (
                    {
                        ...object,
                        curAnswer: object.correctAnswer,
                        color: "green"            
                    }
                ))
            ));
            setDone(true);
        } else {
            setAnswered(true);
            setDragItems((prev) => (
                prev.map((object) => (
                    object.correctAnswer.includes(object.curAnswer) ? 
                    (setCorrect((prev) => prev += 1), {
                        ...object,
                        color: "green"            
                    })
                    :
                    {
                        ...object,
                        color: "red"
                    }
                ))
            ));
        }
    }

    useEffect(() => {
        let inStartContainer = dragItems.filter((answer) => answer.curAnswer === "startContainer");
        if (inStartContainer.length === 0) {
            setIsStartEmpty(true);
        }
    }, [dragItems])

    useEffect(() => {
        if (correct === dropzoneArray.length*2) {
            setDone(true);
        }
    }, [correct])

    useEffect(() => {
        if(done) {
            setDragItems(question.terms.map((object) => (
                    {
                        ...object,
                        curAnswer: question.dragMulti ? object.correctAnswer : object.item,
                        color: "green"            
                    }
                ))
            );
            setIsStartEmpty(true);
        } else {
            setDragItems(question.terms);
            setAnswered(false);
            setIsStartEmpty(false);
            setCorrect(0);
        }
    }, [question, done])

    const dropzoneIndicationStyle = (dropzone) => {
        if (answered) {
            let answers = dragItems;
            let answer = answers.filter((answer) => answer.curAnswer === dropzone)[0];
            if (answer) {
                if (answer.color === "green") {
                    return {border: "5px solid #00916E"}
                } else if (answer.color === "red") {
                    return {border: "5px solid #A01F24"}
                } 
            } 
        }
    }
    const dragitemIndicationStyle = (item) => {
        if (answered) {
            let answers = dragItems;
            let answer = answers.filter((answer) => answer.item === item)[0];
            if (answer) {
                if (answer.color === "green") {
                    return {border: "5px solid #00916E"}
                } else if (answer.color === "red") {
                    return {border: "5px solid #A01F24"}
                } 
            } 
        }
    }

    const itemsInColumn = (dropzoneName) => {
        let curItem = dragItems;
        curItem = curItem.filter((item) => item.curAnswer === dropzoneName);
        
        let curItemArray = curItem.map((item) => (
            <DragItem 
                key={item.item} 
                itemName={item.item} 
                handleDrop={handleDrop}
                answered={answered}
                dragType={question.dragType}
                dragitemIndicationStyle={dragMulti && dragitemIndicationStyle(item.item)}
            />
        ));
        return curItemArray;
    }

    const DropzoneElements = dropzoneArray.map((dropzone, index) => (
        <div key={dropzone} className={classes.dropzoneContainer}>
            {question.dragType === "image" ? 
                (index !== 0 && <img src={arrow} className={classes.arrow} alt="arrow"/>) 
            : 
                dragMulti ? <p> {dropzone} </p> : <div className={classes[`pseodocode${index}`]}></div>
            } 
            {!(question.dragType === "text" && index === 3 && dragMulti) && 
                <Dropzone key={dropzone} 
                    dropzoneName={dropzone} 
                    className={`${classes.dropzone} ${done ? classes.dropzoneDone : null}`}
                    indicationStyle={!dragMulti && dropzoneIndicationStyle(dropzone)}
                    dragType={question.dragType}
                    dragMulti={dragMulti}
                >
                    {itemsInColumn(dropzone)}
                </Dropzone>
            }
        </div>
    ))

    return (
        <div className={classes.DragNDrop} style={question.dragType === "image" ? {alignItems: "center"} : {width: "90%"}}>
            <DndProvider backend={HTML5Backend}>
                {question.subtitle && <p>{question.subtitle}</p>}
                <div className={question.dragType === "image" ? classes.dropzonesImg : classes.dropzonesText}>
                    {DropzoneElements} 
                </div>

                {(!isStartEmpty && !answered) && 
                    <Dropzone dropzoneName={'startContainer'} 
                            className={classes.startContainer} 
                            dragType={question.dragType}
                            dragMulti={dragMulti}
                            style={question.dragType === "text" ? { flexWrap: "wrap", height: "20%", alignSelf: "center" } : null}
                    >
                        {itemsInColumn('startContainer')}
                    </Dropzone>
                }
            </DndProvider>

            {question.img && <img src={planningCheatSheet} alt="planningCheatSheet" className={classes.planningCheatSheet}/>}
            {(isStartEmpty && !done) && <div onClick={() => handleSubmit(answered ? "הצג תשובות" : "בדיקה")} className={classes.checkBtn}> {answered ? "הצג תשובות" : "בדיקה"} </div>}
        </div>
    )
}

export default DragNDrop;