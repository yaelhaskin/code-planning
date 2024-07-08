import React, { useEffect, useState } from 'react';
import classes from "../scss/Overlays.module.scss";

import arrow from "../assets/svg/arrows/arrow.svg"
import suitsRowColor from "../assets/svg/suits/colorSuits.svg"
import suitsRowWhite from "../assets/svg/suits/whiteSuits.svg"

const Overlays = ({ curPageType, arrows, showArrows, setCurPage, setVisitedCurPage }) => {
    const suitsRowSrc = curPageType === "Practice" ? suitsRowWhite : suitsRowColor;
    
    return (
        <div className={classes.Overlays}>
            {showArrows && <div className={classes.arrowContainer} style={{ width: arrows.front ? "98%" : "10%"}}>
                {arrows.back && <img src={arrow} 
                                    alt="arrow" 
                                    className={`${classes.arrow} ${classes.arrowRight}`} 
                                    onClick={() => setCurPage((prev) => prev - 1)}
                                />
                }
                {arrows.front && <img src={arrow} 
                                    alt="arrow" 
                                    className={classes.arrow} 
                                    onClick={() => {setVisitedCurPage(false); setCurPage((prev) => prev + 1)}}
                                />
                }
            </div>}
            
            <img src={suitsRowSrc} alt="suitsRow" className={`${classes.suitsRow} ${showArrows ? classes.ani : null}`} />            
        </div>
    );
};

export default Overlays;