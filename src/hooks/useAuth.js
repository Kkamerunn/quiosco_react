import { useEffect } from "react"
import useSWR from "swr"
import { useNavigate } from "react-router-dom" 
import axiosClient from "../config/axios"

const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()
    
    const { data: user, error, mutate } = useSWR('/api/user', () => 
        axiosClient('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            throw Error(err?.response?.data?.errors)
        })
    )

    const login = async (data1, setErrors) => {
        try {
            const { data } = await axiosClient.post('/api/login', data1)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrors([])
            await mutate(data)
        } catch (error) {
            setErrors(Object.values(error.response.data.errors))
        }
    }

    const register = async (data1, setErrors) => {
        try {
            const { data } = await axiosClient.post('/api/register', data1)
            setErrors([])
            localStorage.setItem('AUTH_TOKEN', data.token)
            await mutate(data)
        } catch (error) {
            setErrors(Object.values(error.response.data.errors))
        }
    }

    const logout = async () => {
        try {
            await axiosClient.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (err) {
            throw Error(err?.response?.data?.errors)
        }
    }
    
    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url)
        }
        if (middleware === 'guest' && user && user.admin) {
            navigate('/admin')
        }
        if (middleware === 'admin' && user && !user.admin) {
            navigate('/')
        }
        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error])

    return {
        login,
        register,
        logout,
        user,
        error
    }
}

export default useAuth