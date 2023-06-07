import useSWR from 'swr'
import axiosClient from '../config/axios'
import Product from '../components/Product'

const Products = () => {
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => axiosClient('/api/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(({data}) => data.data)
  const { data, error, isLoading } = useSWR('/api/products', fetcher, {
    refreshInterval: 10000
  })

  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <h1 className="text-4xl font-black">Products</h1>
      <p className="text-2xl my-10">Manage products from here</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data?.map(product => (
          <Product
            key={product.image}
            product={product}
            buttonAvailable={true}
          />
        ))}
      </div>
    </div>
  )
}

export default Products