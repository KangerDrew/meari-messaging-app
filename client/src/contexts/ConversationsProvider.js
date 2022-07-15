import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'


// 52:00

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

export function ConversationsProvider({ children }) {

    const [conversations, setConversations] = useLocalStorage('conversations', [])

    function createConversations(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    return (
        <ConversationsContext.Provider value={{ conversations, createConversations }}>
            {children}
        </ConversationsContext.Provider>
    )

}