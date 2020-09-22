import { useState, useEffect } from "react"; // we're not using JSX

function useLocalStorage(key: string) {
    const [storedValue, setStoredValue] = useState([
        {
            question: 'What is the capital of Texas',
            answer: 'Austin'
        }
    ])

    useEffect(() => {
        const item = window.localStorage.getItem(key)
        if (item !== null) {
            setStoredValue(JSON.parse(item))
        }
    }, [key])

    const clearStorage = () => {
        setStoredValue([])
        window.localStorage.clear()
    }

    const setValue = (value: { question: string; answer: string; }[]) => {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    return [storedValue, setValue, clearStorage] as const // the as const is need to be able to call the setter
}

export default useLocalStorage