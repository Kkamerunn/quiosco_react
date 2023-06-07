import { createContext, useState, useEffect } from "react"
import { toast } from 'react-toastify';
import axiosClient from "../config/axios";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState({})
    const [modal, setModal] = useState(false)
    const [product, setProduct] = useState({})
    const [order, setOrder] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const newTotal = order.reduce((total, product) => (product.price * product.quantity) + total, 0)
        setTotal(newTotal)
    }, [order])

    const handleClickCurrentCategory = id => {
        const category = categories.filter(cat => cat.id === id)[0]
        setCurrentCategory(category)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleClickProduct = prod => {
        setProduct(prod)
    }

    const getCategories = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await axiosClient('/api/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategories(data.data)
            setCurrentCategory(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleSetOrder = ({categoria_id, ...product}) => {
        if (order.some(orderState => orderState.id === product.id)) {
            const orderUpdated = order.map(orderState => orderState.id === product.id ? product : orderState)
            setOrder(orderUpdated)
            toast.success('Saved succesfully')
        } else {
            setOrder([...order, product])
            toast.success('Product added succesfully')
        }
    }

    const handleEditProductQuantity = id => {
        const productUpdate = order.filter(product => product.id === id)[0]
        setProduct(productUpdate)
        setModal(!modal)
    }

    const handleRemoveProductResume = id => {
        const newOrder = order.filter(product => product.id !== id)
        setOrder(newOrder)
    }

    const handleSubmitNewOrder = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await axiosClient.post('/api/orders', {
                total,
                products: order.map(prod => {
                    return {
                        id: prod.id,
                        quantity: prod.quantity
                    }
                }),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            setTimeout(() => {
                setOrder([])
            }, 1000)

            //logout
            /* setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN')
                logout()
            }, 3000) */
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompleteOrder = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await axiosClient.put(`/api/orders/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProductOutOfStock = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await axiosClient.put(`/api/products/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categories,
                currentCategory,
                handleClickCurrentCategory,
                modal,
                handleClickModal,
                product,
                handleClickProduct,
                order,
                handleSetOrder,
                handleEditProductQuantity,
                handleRemoveProductResume,
                total,
                handleSubmitNewOrder,
                handleClickCompleteOrder,
                handleClickProductOutOfStock
            }}
        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext