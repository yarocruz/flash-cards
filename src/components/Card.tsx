import React from "react";

type Props = {
    question: string,
    answer: string
    deck?: string
}

function Card({question, answer, deck}: Props) {
    return(
        <div>
            <h1>{question}</h1>
            <h1>{answer}</h1>
        </div>
    )
}

export default Card