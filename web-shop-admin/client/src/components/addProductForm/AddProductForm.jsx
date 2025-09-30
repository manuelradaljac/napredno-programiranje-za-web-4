import React, { useState } from 'react'
import styles from './AddProductForm.module.css'

const AddProductForm = ({ productData, productId, setProductData }) => {

    const [updateInProgress, setUpdateInProgress] = useState(false)

    function onChangeFormData(e) {
        const { name, value } = e.target
        if (name === 'stock' || name === 'price' || name === 'warranty') {
            const valueAsNumber = Number(value)
            setProductData(prev => ({
                ...prev,
                [name]: valueAsNumber
            }))
            return
        }
        setProductData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(JSON.stringify(productData))
        setUpdateInProgress(true)
        try {
            const response = await fetch("http://localhost:3000/products", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            })
        } catch (error) {
            console.log('Error updating product:', error)
        } finally {
            setUpdateInProgress(false)
        }
    }


    return (
        <div>
            {productData && <form className={styles.product_form} onSubmit={handleSubmit}>
                <fieldset disabled={updateInProgress}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={productData.name} onChange={onChangeFormData} />
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={productData.price} onChange={onChangeFormData} />
                    <label htmlFor="stock">Stock:</label>
                    <input type="number" id="stock" name="stock" value={productData.stock} onChange={onChangeFormData} />
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category_id" value={productData.category_id} onChange={onChangeFormData} />
                    <label htmlFor="specs">Specs:</label>
                    <textarea id="specs" name="specs" value={productData.specs} onChange={onChangeFormData} />
                    <label htmlFor="warranty">Warranty:</label>
                    <input type="number" id="warranty" name="warranty" value={productData.warranty} onChange={onChangeFormData} />
                    <label htmlFor="desc">Description:</label>
                    <textarea id="desc" name="description" value={productData.description} onChange={onChangeFormData} />
                    <button type='submit'>Save changes</button>
                </fieldset>
            </form>}
        </div>
    )
}

export default AddProductForm