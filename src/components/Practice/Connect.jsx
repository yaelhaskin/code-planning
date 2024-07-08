import React, { useEffect, useState } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

import './Connect.scss';
import whiteSuit from '../../assets/svg/suits/whiteSpade.svg';
import orangeSuit from '../../assets/svg/suits/orangeSpade.svg';

const Connect = ({ question, done, setDone }) => {
    const answers = question.correctAnswers;
    const problemsArray = question.problemsArray;
    const limitsArray = question.limitsArray;

    const [selectedElements, setSelectedElements] = useState([]);
    const [lines, setLines] = useState([]);
    const [checked, setChecked] = useState(false);

    const handleItemClick = (element) => {
        const connectedLine = lines.find(line => line.from === element || line.to === element);
        if (connectedLine || selectedElements.includes(element)) {
            // Remove the line if the element is already connected
            setLines(lines.filter(line => line !== connectedLine));
            setSelectedElements([]);
        } else {
            setSelectedElements(prev => {
                if (prev.length === 1) {
                    if ((problemsArray.includes(prev[0]) && problemsArray.includes(element))
                        ||
                        (limitsArray.includes(prev[0]) && limitsArray.includes(element))
                    ) {
                        return prev;
                    }
                    
                    const newLine = { from: prev[0], to: element };
                    setLines([...lines, newLine]);
                    return [];
                } else {
                    return [element];
                }
            });
        }
    };

    const isCorrectConnection = (from, to) => {
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].includes(from) && answers[i].includes(to)) {
                return true;
            }
        }
        return false;
    };

    const handleCheck = (btn) => {
        if (btn === "בדיקה") {
            setChecked(true);
            if (lines.length === answers.length && lines.every((line) => isCorrectConnection(line.from, line.to))) {
                setDone(true);
            }
        } else {
            setLines(lines.filter((line) => isCorrectConnection(line.from, line.to)));
            setChecked(false);
        }
    };

    useEffect(() => {
        if (done) {
            const correctLines = answers.map(answer => {
                const [from, to] = answer.split(':');
                return { 
                    from: from.trim(), 
                    to: to.trim()
                };
            });
            setLines(correctLines);
            setChecked(true);
        } else {
            setLines([]);
            setChecked(false);
        }
    }, [done]);

    const arrayElement = (array, isLimitArray) => (
        <div className={`array ${isLimitArray ? 'flexEnd' : ''}`}>
            {array.map((element) => {
                const id = element;
                const relations = lines.filter((line) => line.from === id || line.to === id).map((line) => ({
                    targetId: line.from === id ? line.to : line.from,
                    targetAnchor: !isLimitArray ? 'right' : 'left',
                    sourceAnchor: isLimitArray ? 'right' : 'left',
                    style: { 
                        strokeColor: checked ? (isCorrectConnection(line.from, line.to) ? '#00916E' : '#A01F24') : '#FF8200', 
                        strokeWidth: 2 
                    },
                }));

                return (
                    <ArcherElement
                        key={element}
                        id={id}
                        relations={relations}
                    >
                        <div
                            className={`item ${isLimitArray ? 'reverse' : ''}`}
                            onClick={(event) => handleItemClick(id, event)}
                        >
                            <p>{element}</p>
                            <img src={!checked && (selectedElements.includes(id) || lines.find((line) => line.from.includes(id) || line.to.includes(id))) ? 
                                orangeSuit : whiteSuit} alt='suit' />
                        </div>
                    </ArcherElement>
                );
            })}
        </div>
    );

    return (
        <div className={`Connect ${selectedElements.length > 0 ? "cursor" : ""}`}>
            <ArcherContainer strokeColor="white" className="ArcherContainer" lineStyle="straight">
                <div className="arrayContainer">
                    {arrayElement(problemsArray, false)}
                </div>
                <div className="arrayContainer">
                    {arrayElement(limitsArray, true)}
                </div>
            </ArcherContainer>
            {(!done && lines.length === answers.length) && 
                <div onClick={() => handleCheck(checked ? "ניסיון חוזר" : "בדיקה")} 
                    className="checkBtn"
                > {checked ? "ניסיון חוזר" : "בדיקה"} </div>
            }
        </div>
    );
};

export default Connect;
