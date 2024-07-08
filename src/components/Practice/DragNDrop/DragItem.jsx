import React from 'react';
import { useDrag } from "react-dnd";

import classes from './DragNDrop.module.scss'

import card0 from "../../../assets/svg/planningCards/card0.svg"
import card1 from "../../../assets/svg/planningCards/card1.svg"
import card2 from "../../../assets/svg/planningCards/card2.svg"
import card3 from "../../../assets/svg/planningCards/card3.svg"
import Card from '../../Card';

const DragItem = ({ itemName, handleDrop, answered, dragType, dragitemIndicationStyle, style }) => {
  let cardObj = {
    card0: card0,
    card1: card1,
    card2: card2,
    card3: card3
  }
  let dropResult;

  const [{}, drag] = useDrag({
    type: dragType,
    item: { itemName },
    canDrag: !answered,
    end: (itemName, monitor) => {
        dropResult = monitor.getDropResult();
        if(dropResult){
          handleDrop(itemName, dropResult.name);
        } 
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <>
      {dragType === "image" ?
        <div ref={drag} className={classes.dragCard}>
            <img src={cardObj[itemName]} alt='card' />
        </div>
      :
        <p ref={drag} className={classes.dragText} style={dragitemIndicationStyle || style}> {itemName} </p>
      }
    </>
  )
}

export default DragItem;