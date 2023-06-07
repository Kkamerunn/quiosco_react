import useSWR from 'swr'
import axiosClient from '../config/axios'
import { formatMoney } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const Orders = () => {

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => axiosClient('/api/orders', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const { handleClickCompleteOrder } = useQuiosco()

  const { data, error, isLoading } = useSWR('/api/orders', fetcher, {refreshInterval: 1000})

  return (
    <div>
      <h1 className="text-4xl font-black">Orders</h1>
      <p className="text-2xl my-10">Manage orders from here</p>
      <div className='grid grid-cols-2 gap-5'>
        {data?.data?.data.map(order => (
          <div key={order.id} className='p-5 bg-white shadow space-y-2 border-b'>
            <p className='text-xl font-bold text-slate-600'>
              Order description:
            </p>
            {order.products.map(product => (
              <div
                key={product.id}
                className='border-b border-b-slate-200 last-of-type:border-none py-4'
              >
                <p className='text-sm'>ID: {product.id}</p>
                <p>{product.name}</p>
                <p>
                  Quantity: {''}
                  <span className='font-bold'>{product.pivot.quantity}</span>
                </p>
              </div>
            ))}
            <p className='text-lg font-bold'>
              Customer: {''}
              <span>{order.user.name}</span>
            </p>
            <p className='text-lg font-bold text-amber-500'>
              Total: {''}
              <span>{formatMoney(order.total)}</span>
            </p>
            <button
              type='button'
              className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer'
              onClick={() => handleClickCompleteOrder(order.id)}
            >
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders