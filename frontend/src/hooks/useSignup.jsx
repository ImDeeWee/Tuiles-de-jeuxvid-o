import { useState } from "react"
import {useAuthContext} from "./useAuthContext.jsx"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password, username, role) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5555/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, username, role})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            
            localStorage.setItem('user', JSON.stringify(json))

            
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    return { signup, isLoading, error}
}
