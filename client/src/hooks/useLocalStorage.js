// It seems, that instead of using database to keep track of user,
// we are going to use localStorage to keep the user data & messaging
// history:
import { useEffect, useState } from 'react'


const PREFIX = 'meari-messaging-'

export default function useLocalStorage(key, initialValue) {

    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {

        // Retrieve prefixedKey's value from localStorage JSON:
        const jsonValue = localStorage.getItem(prefixedKey)
        
        // If there are stored data already, just return it:
        if (jsonValue != null) return JSON.parse(jsonValue)
        
        // Otherwise, check initialValue type. If it's a function,
        // return it as the function. Otherwise return it normally:
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }

    })

    // useEffect keeps track of when the prefixedKey or value changes,
    // and changes the id stored in localStorage when they are updated:
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])


    return [value, setValue]
}