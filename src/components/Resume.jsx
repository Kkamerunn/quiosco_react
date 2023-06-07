import useQuiosco from "../hooks/useQuiosco"
import useAuth from "../hooks/useAuth"
import ProductResume from "./ProductResume"
import { formatMoney } from "../helpers"

const Resume = () => {

  const { order, total, handleSubmitNewOrder } = useQuiosco()
  const { logout } = useAuth({})

  const handleSubmit = async e => {
    e.preventDefault()
    handleSubmitNewOrder(logout)
  }

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">My order</h1>
      <p className="text-lg my-5">Here you will be able to see your resume</p>
      <div className="py-10">
        {order.length === 0 ? (
          <p className="text-center text-2xl">There are no products in your order yet</p>
        ) : (
          order.map(product => (
            <ProductResume 
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>
      <p className="text-xl mt-10">Total: {formatMoney(total)}</p>
      <form 
        className="w-full"
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input
            type="submit"
            className={`${order.length === 0 ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} px-5 py-2 rounded uppercase font-bold text-white text-center w-full`}  
            value="Confirm order"
            disabled={order.length === 0}
          />
        </div>
      </form>
    </aside>
  )
}

export default Resume