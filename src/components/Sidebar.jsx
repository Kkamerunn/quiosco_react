import Category from "./Category"
import useQuiosco from "../hooks/useQuiosco"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {

  const { categories } = useQuiosco()
  const { logout, user } = useAuth({middleware: 'auth'})

  return (
    <aside className="md:w-72">
        <div className="p-4">
            <img
              className="w-40"
              src="img/logo.svg"
              alt="logo"
            />
        </div>
        <p className="my-10 text-xl text-center">Hi {user?.name}</p>
        <div className="mt-10">
            {categories.map(category => (
                <Category key={category.id} category={category} />
            ))}
        </div>
        <div className="my-5 py-5">
              <button
                type="button"
                className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                onClick={logout}
              >
                Cancel order
              </button>
        </div>
    </aside>
  )
}

export default Sidebar