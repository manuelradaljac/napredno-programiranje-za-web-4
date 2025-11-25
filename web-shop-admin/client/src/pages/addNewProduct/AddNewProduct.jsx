import React, { useState } from 'react'
import ProductForm from '../../components/productForm/ProductForm'
import useFetch from '../../hooks/useFetch'

const getEmptyProductForm = () => {
    return {
        name: '',
        price: '',
        stock: '',
        categoryId: '',
        specs: '',
        warranty: '',
        description: ''
    }
}

const AddNewProduct = () => {
    const [formData, setFormData] = useState(getEmptyProductForm())
    const {data, error, isPending} = useFetch('http://localhost:3000/categories')


    const resetFormData = () => {
        setFormData(getEmptyProductForm())
    }

    return (
        <div>
            {error && <p>Error fetching</p>}
            {isPending && <p>Loading</p>}
            {data && <ProductForm formData={formData} setFormData={setFormData} resetFormData={resetFormData} categories={data}/>}
        </div>
    )
}

export default AddNewProduct