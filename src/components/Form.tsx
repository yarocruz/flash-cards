import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "./Card";

function Form() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const [cards, setCards, clearCards] = useLocalStorage('cards')

    const handleSubmit = (event: any) => {
        event.preventDefault()
        setCards([...cards, { question, answer }])
        setQuestion('')
        setAnswer('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Question</label>
                <input
                    onChange={event => setQuestion(event.target.value)}
                    value={question}
                    name="question"
                    type="text"
                    placeholder="Type a Question"
                />
                <label htmlFor="answer">Answer</label>
                <input
                    onChange={event => setAnswer(event.target.value)}
                    value={answer}
                    name="Answer"
                    type="text"
                    placeholder="Type the Answer"
                />
                <select name="topic" id="category">
                    <option value="topic">Topic</option>
                </select>
                <button type="submit">Submit</button>
            </form>

            <div style={{ display: 'flex', flexWrap: "wrap"}}>
                {cards.map(card => {
                    return <Card  key={card.question} question={card.question} answer={card.answer} />
                })}
            </div>

            <button onClick={clearCards}>Clear all Cards</button>
        </div>
    )
}

export default Form