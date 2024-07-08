import React, { useState, useEffect } from 'react';
import classes from "../../scss/Practice.module.scss";

import DragNDrop from './DragNDrop/DragNDrop';
import OpenEnd from './OpenEnd';
import Select from './Select';
import Connect from './Connect';

const Practice = ({ curPage, title, text, practice, visitedCurPage, handleArrows }) => {
    const [done, setDone] = useState(false);

    useEffect(() => {
        done ? handleArrows(true, true, "practice") : setDone(false);
    }, [done])
        
    useEffect(() => {
        setDone(visitedCurPage);
    }, [curPage, visitedCurPage])

    return (
        <div className={classes.Practice}>
            <div className={classes.textContainer}>
                <p className={classes.title}> {title} </p>
                <p className={classes.text}> {text} </p>

                {practice.practiceType === "Select" && <Select 
                                                            question={practice} 
                                                            done={done}
                                                            setDone={setDone}
                                                        />
                                                    }
                {practice.practiceType === "Connect" && <Connect 
                                                            question={practice} 
                                                            done={done}
                                                            setDone={setDone}
                                                        />
                                                    }
                {practice.practiceType === "DragNDrop" && <DragNDrop 
                                                            question={practice} 
                                                            done={done}
                                                            setDone={setDone}
                                                        />
                                                    }
                {practice.practiceType === "OpenEnd" && <OpenEnd 
                                                            question={practice} 
                                                            done={done}
                                                            setDone={setDone}
                                                        />
                                                    }
            </div>
        </div>
    );
};

export default Practice;