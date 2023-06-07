import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <main className="max-w-4xl mx-auto mt-10 md:mt-14 flex flex-col md:flex-row items-center">
      <img
        src="/img/logo.svg"
        alt="logo"
        className="max-w-xs"
        width="200"
        height="200"
      />
      <div className="p-10 w-full">
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout