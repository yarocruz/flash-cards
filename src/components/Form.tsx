import React, { useState } from "react";

function Form() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const handleQuestion = (event: any) => {
        event.preventDefault()
        setQuestion(event.target.value)
    }

    const handleAnswer = (event: any) => {
        event.preventDefault()
        setAnswer(event.target.value)
    }

    return (
        <div>
            <form>
                <label htmlFor="question">Question</label>
                <input
                    value={question}
                    onChange={handleQuestion}
                    name="question"
                    type="text"
                    placeholder="Type a Question"
                />
                <label htmlFor="answer">Answer</label>
                <input
                    value={answer}
                    onChange={handleAnswer}
                    name="Answer"
                    type="text"
                    placeholder="Type the Answer"
                />
                <select name="topic" id="category">
                    <option value="topic">Topic</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            <div>{question}</div>
            <div>{answer}</div>
        </div>
    )
}

export default Form