import { createRef, useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Alert from "../components/Alert"

const Login = () => {
  const [errors, setErrors] = useState([])
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  })

  const emailRef = createRef()
  const passwordRef = createRef()

  const handleSubmit = async e => {
      e.preventDefault()

      const data1 = {
          email: emailRef.current.value,
          password: passwordRef.current.value
      }

      login(data1, setErrors)
  }

  return (
    <>
      <h1 className="text-4xl font-black">Log in</h1>
      <p>To create an order you need to be logged in</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
          {errors && errors.map(error => (
            <Alert key={error}>
                {error}
            </Alert>
          ))}
          <form onSubmit={handleSubmit} noValidate>
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
              <input
                  type="submit"
                  value="log in"
                  className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
              />
          </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/register">
          Don't you still have an account? create one here
        </Link>
      </nav>
    </>
  )
}

export default Login