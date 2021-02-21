import React, {useState, useRef, useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "./Card";

function Form() {
    const [cardData, setCardData] = useState({
        question: '',
        answer: '',
        category: ['none']
    })

    const [isFiltered, setIsFiltered] = useState(false)
    const [selected, setSelected] = useState('')

    const [cards, setCards, clearCards] = useLocalStorage('cards')

    const inputRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)

    const addCard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (categoryRef.current && cards && cardData.answer) {
            setCards([...cards, { question: cardData.question, answer: cardData.answer, category: categoryRef.current.value }])
        }
        setCardData( {
            answer: '',
            question: '',
            ...cardData,
        })
    }

    const addCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (inputRef.current) {
            setCardData({
                ...cardData,
                category: [...cardData.category, inputRef.current.value]
            })
            window.localStorage.setItem('category', JSON.stringify([...cardData.category, inputRef.current.value]))
            inputRef.current.value = ''
        }
    }

    const sortByCategory = (filter: string) => {
       if (filter !== 'none') {
           setIsFiltered(true)
           setSelected(filter)
       } else {
           setIsFiltered(false)
       }
    }

    useEffect(() => {
        const item = window.localStorage.getItem('category')
        if (item !== null) {
            // setCategory(JSON.parse(item))
            setCardData({
                ...cardData,
                category: [...JSON.parse(item)]
            })
        }
    }, [])

    return (
        <div className='m-3'>
            <div className='flex flex-col max-w-4xl'>
                <form className='my-4 border-2 p-3' onSubmit={addCard}>
                    <label htmlFor="question">Question</label>
                    <div className="mt-1 relative rounded-md">
                        <input
                            className="form-input my-2 block w-full sm:text-sm sm:leading-5 p-2 border-2 bg-transparent"
                            onChange={event => setCardData({...cardData, question: event.target.value })}
                            value={cardData.question}
                            name="question"
                            type="text"
                            placeholder="Type a Question"
                        />
                    </div>
                    <label htmlFor="answer">Answer</label>
                    <div className="mt-1 relative rounded-md">
                        <input
                            className="form-input my-2 block w-full sm:text-sm sm:leading-5 p-2 border-2 bg-transparent"
                            onChange={event => setCardData({...cardData, answer: event.target.value })}
                            value={cardData.answer}
                            name="answer"
                            type="text"
                            placeholder="Type the Answer"
                        />
                    </div>

                    <label htmlFor="category">Select Category</label>
                    <div className="mt-1 relative rounded-md">
                        <select
                            className="form-select h-full p-2 border-2 bg-transparent text-gray-500 sm:text-sm sm:leading-5"
                            aria-label="Category"
                            name="topic"
                            id="category"
                            ref={categoryRef}
                        >
                            {cardData.category.map(cat => {
                                return (
                                    <option  key={cat} value={cat}>{cat}</option>
                                )
                            })}
                        </select>
                    </div>

                    <button className='bg-teal-300 px-5 py-2 rounded my-2' type="submit">Submit</button>

                </form>

                <form className='my-4 border-2 p-3' onSubmit={addCategory}>
                    <label htmlFor="category">Create a New Category / Deck</label>
                    <div className="mt-1 relative rounded-md">
                        <input
                            className="form-input block w-full p-2 border-2 bg-transparent text-gray-500 sm:text-sm sm:leading-5"
                            id="category"
                            ref={inputRef}
                            name="category"
                            type="text"
                            placeholder="type something like math, or programming"
                        />
                        <button className='bg-teal-300 px-5 py-2 my-2 rounded' type="submit">Submit</button>
                    </div>
                </form>
            </div>

            {cardData.category.map(cat => {
                return (
                    <button onClick={() => sortByCategory(cat)} key={cat} className='bg-blue-400 px-5 py-2 my-2 mr-5 rounded'>{cat}</button>
                )
            })}

            <div style={{ display: 'flex', flexWrap: "wrap"}}>
                {!isFiltered ? cards.map(card => {
                    return <Card key={card.question} question={card.question} answer={card.answer} />
                }) : cards.filter(card => card.category === selected).map(card => <Card key={card.question} question={card.question} answer={card.answer} />)}
            </div>

            <button className='italic text-yellow-700 bg-blue-200 p-5' onClick={clearCards}>Clear all Cards</button>

        </div>
    )
}

export default Form