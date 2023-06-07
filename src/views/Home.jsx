import useSWR from 'swr'
import Product from "../components/Product"
import useQuiosco from "../hooks/useQuiosco"
import axiosClient from '../config/axios'

const Home = () => {
  const { currentCategory } = useQuiosco()
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => axiosClient('/api/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(({data}) => data.data)
  const { data, error, isLoading } = useSWR('/api/products', fetcher, {
    refreshInterval: 1000
  })

  if (isLoading) return <div>loading...</div>

  const products = data.filter(product => product.category_id === currentCategory.id)

  return (
    <>
      <h1 className="text-4xl font-black">{currentCategory.name}</h1>
      <p className="text-2xl my-10">
        Choose and customize your order.
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {
          products.map(product => (
            <Product
              key={product.image}
              product={product}
              buttonAdd={true}
            />
          ))
        }
      </div>
    </>
  )
}

export default Home