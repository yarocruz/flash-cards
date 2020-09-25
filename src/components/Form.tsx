import React, {useState, useRef, useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "./Card";

function Form() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [category, setCategory] = useState(['none'])

    const [cards, setCards, clearCards] = useLocalStorage('cards')

    const inputRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (categoryRef.current) {
            setCards([...cards, { question, answer, category: categoryRef.current.value }])
        }
        setQuestion('')
        setAnswer('')
    }

    const addCategory = (e: any) => {
        e.preventDefault()
        if (inputRef.current) {
            setCategory([...category, inputRef.current.value])
            window.localStorage.setItem('category', JSON.stringify([...category, inputRef.current.value]))
            inputRef.current.value = ''
        }
    }

    useEffect(() => {
        const item = window.localStorage.getItem('category')
        if (item !== null) {
            setCategory(JSON.parse(item))
        }
    }, [])

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
                    name="answer"
                    type="text"
                    placeholder="Type the Answer"
                />
                <select name="topic" id="category" ref={categoryRef} >
                    {category.map(cat => {
                        return (
                            <option  key={cat} value={cat}>{cat}</option>
                        )
                    })}
                </select>

                <button type="submit">Submit</button>
            </form>
            <form onSubmit={addCategory}>
                <label htmlFor="category">Create a New Category / Deck</label>
                <input
                    ref={inputRef}
                    name="category"
                    type="text"
                    placeholder="optional"
                />
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