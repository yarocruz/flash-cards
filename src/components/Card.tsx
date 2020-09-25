import React, { useState } from "react";
import { useSpring, animated} from "react-spring";
import '../App.css'

type Props = {
    question: string,
    answer: string
    deck?: string
}

function Card({question, answer, deck}: Props) {
    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80}
    })
    return(
        <div className='card-wrap' onClick={() => set(state => !state)}>
            <animated.div className='card front' style={{ opacity: opacity.interpolate((o:any) => 1 - o), transform}}>
                <h4>{question}</h4>
            </animated.div>

            <animated.div className='card back' style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`)}}>
                <h4>{answer}</h4>
            </animated.div>
        </div>
    )
}
export default Card