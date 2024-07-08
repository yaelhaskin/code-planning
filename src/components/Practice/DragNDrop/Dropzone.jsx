import React, { useState, useEffect } from 'react';
import { useDrop } from "react-dnd";

import classes from './DragNDrop.module.scss'

const Dropzone = ({ children, dropzoneName, className, indicationStyle, style, dragType, dragMulti }) => {
    const [isFull, setIsFull] = useState(false);

    useEffect(() => {
        setIsFull(false);
    }, [])

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: dragType,
        drop: () => {
            if (dragMulti) {
                return { name: dropzoneName };
            } else {
                if (!isFull || children.length === 0) {
                    setIsFull(true);
                    return { name: dropzoneName };
                }
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: () => dragMulti || !isFull || children.length === 0,
    }), [isFull, dragMulti, children.length]);

    return (
        <div ref={drop} 
        style={indicationStyle || style}
        className={`${className} ${dropzoneName !== 'startContainer' ? (isOver ? classes.isOver : classes.isNotOver) : null}`}
        >
            {children}
        </div>
    )
}

export default Dropzone;