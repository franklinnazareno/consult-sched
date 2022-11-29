import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://backend-consult-sched-production.up.railway.app/api/auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            if(json.error) {
                setError(json.error)
            }
            else {
                setError('Invalid Credentials')
            }
        }

        if (response.ok) {
            // save user JWT on local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

        }
    }

    return { login, isLoading, error }
}