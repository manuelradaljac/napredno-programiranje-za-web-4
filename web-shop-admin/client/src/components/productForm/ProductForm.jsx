import React, { useState } from 'react'
import styles from './ProductForm.module.css'

const ProductForm = ({ formData, setFormData, productId, resetFormData, categories }) => {

    const [updateInProgress, setUpdateInProgress] = useState(false)
    const [formDataInvalid, setformDataInvalid] = useState(false)
    console.log('categories values', formData)

    function handleChange(e) {
        const { name, value } = e.target
        const isNumericInput = name === 'price' || name === 'stock' || name === 'warranty'
        if (isNumericInput) {
            setFormData(prev => ({
                ...prev,
                [name]: Number(value)
            }))
            return
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setUpdateInProgress(true)
        try {
            const response = await fetch("http://localhost:3000/products", {
                method: productId ? 'PUT' : 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (!productId) {
                const result = await response.json()
                console.log('result', result)
            }
            if (response.status === 400) {
                setformDataInvalid(true)
                return
            }
            setformDataInvalid(false)
            if (!productId) {
                resetFormData()
            }
        } catch (error) {
            console.log('Error updating product:', error)
            setformDataInvalid(false)
        } finally {
            setUpdateInProgress(false)
        }
    }

    return (
        <form className={styles.product_form} onSubmit={handleSubmit}>
            <fieldset disabled={updateInProgress}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                <label htmlFor="stock">Stock:</label>
                <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} />
                <label htmlFor="category">Category:</label>
                <input type="number" id="category" name="category_id" value={formData.category_id} onChange={handleChange} />
                <label htmlFor="specs">Specs:</label>
                <textarea id="specs" name="specs" value={formData.specs} onChange={handleChange} />
                <label htmlFor="warranty">Warranty:</label>
                <input type="number" id="warranty" name="warranty" value={formData.warranty} onChange={handleChange} />
                <label htmlFor="desc">Description:</label>
                <textarea id="desc" name="description" value={formData.description} onChange={handleChange} />
                <button type='submit'>{updateInProgress ? 'Updating' : 'Save changes'}</button>
                {formDataInvalid && <p className={styles.invalid_form_data_p}>Form data invalid</p>}
            </fieldset>
        </form>
    )
}

export default ProductForm