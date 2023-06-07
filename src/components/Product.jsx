import { formatMoney } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const Product = ({product, buttonAdd = false, buttonAvailable = false}) => {
  
  const { name, image, price } = product

  const { handleClickModal, handleClickProduct, handleClickProductOutOfStock } = useQuiosco()
  
  return (
    <div className="border p-3 shadow bg-white">
      <img
        src={`img/${image}.jpg`}
        alt={`image ${name}`}
        className="w-full"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatMoney(price)}</p>
        {buttonAdd && <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          onClick={() => {
            handleClickModal();
            handleClickProduct(product);
          }}
        >
          add
        </button>}
        {buttonAvailable && <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          onClick={() => handleClickProductOutOfStock(product.id)}
        >
          Out of stock
        </button>}
      </div>
    </div>
  )
}

export default Product