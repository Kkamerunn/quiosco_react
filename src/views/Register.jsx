import { createRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../config/axios"
import Alert from "../components/Alert"
import useAuth from "../hooks/useAuth"

const Register = () => {
    const [errors, setErrors] = useState([])
    const { register } = useAuth({middleware: 'guest', url: '/'})

    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()

    const handleSubmit = async e => {
        e.preventDefault()

        const data1 = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

       register(data1, setErrors)
    }

    return (
        <>
            <h1 className="text-4xl font-black">Create your account</h1>
            <p>Create your account filling out the form</p>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                {errors && errors.map(error => (
                    <Alert key={error}>
                        {error}
                    </Alert>
                ))}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label className="text-slate-800 cursor-pointer" htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="name"
                            placeholder="Your name"
                            ref={nameRef}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-800 cursor-pointer" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="email"
                            placeholder="Your email"
                            ref={emailRef}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-800 cursor-pointer" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password"
                            placeholder="Your password"
                            ref={passwordRef}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-800 cursor-pointer" htmlFor="password_confirmation">Repeat password:</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password_confirmation"
                            placeholder="Repeat your password"
                            ref={passwordConfirmationRef}
                        />
                    </div>
                    <input
                        type="submit"
                        value="create account"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>
            <nav className="mt-5">
                <Link to="/auth">
                Already have an account? log in here
                </Link>
            </nav>
        </>
    )
}

export default Register