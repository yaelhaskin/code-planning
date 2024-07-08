import React, { useState, useEffect, useRef } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

import cardTower0 from "../assets/animations/cardTower/data.json";  
import cardTower1 from "../assets/animations/cardTower/data1.json";  
import pseudocodeCard from "../assets/animations/pseudocodeCards/data.json";  
import psuedocodeCar from "../assets/animations/pseudocodeCar/data.json";  
import pseudocodeStars from "../assets/animations/pseudocodeStars/data.json";  

import "../scss/Animations.scss"

const Animations = ({ ani, playAni, controls }) => {
    const [aniOver, setAniOver] = useState(false);
    const playerRef = useRef(null);

    const curAni = {
        cardTower0: cardTower0,
        cardTower1: cardTower1,
        pseudocodeCard: pseudocodeCard,
        pseudocodeCar: psuedocodeCar,
        pseudocodeStars: pseudocodeStars
    }

    useEffect(() => {
        if (playAni && playerRef.current) {
            playerRef.current.play();
        }
    }, [playAni]);

    return (
        <Player 
            className="pseudocode"
            src={curAni[ani]}
            autoplay={playAni}
            loop={false}
            ref={playerRef}
            controls={true}
            onEvent={(event) => event === "complete" ? (setAniOver(true)) : null}
        > 
            <Controls visible={playAni && controls} buttons={['play']} />
        </Player>
    );
};

export default Animations;
