import React, { useState } from 'react'
import ProductForm from '../../components/productForm/ProductForm'

const getEmptyProductForm = () => {
    return {
        name: '',
        price: '',
        stock: '',
        category_id: '',
        specs: '',
        warranty: '',
        description: ''
    }
}

const AddNewProduct = () => {
    const [formData, setFormData] = useState(getEmptyProductForm())

    const resetFormData = () => {
        setFormData(getEmptyProductForm())
    }

    return (
        <div>
            <ProductForm formData={formData} setFormData={setFormData} resetFormData={resetFormData} />
        </div>
    )
}

export default AddNewProduct