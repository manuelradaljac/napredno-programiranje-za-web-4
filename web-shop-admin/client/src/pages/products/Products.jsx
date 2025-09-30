import React, { useState, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import ProductsList from '../../components/productsList/productsList'
import styles from './Products.module.css'
import { Link } from 'react-router-dom'

const Products = () => {

  const inputElementRef = useRef()
  const [searchTerm, setSearchTerm] = useState('')
  const { data, error, isPending } = useFetch(`http://localhost:3000/products?product_name=${searchTerm}`)

  function handleSearch() {
    const inputValue = inputElementRef.current.value
    setSearchTerm(inputValue)
  }

  return (
    <div>
      <div className={styles.search_div}>
        <input type="text" className={styles.search_products_input} ref={inputElementRef} />
        <button className={styles.search_btn} onClick={handleSearch}>
          <img className={styles.search_img} src="/images/search-icon.png" alt="" />
        </button>
      </div>
      {isPending && <p>Loading...</p>}
      {error && <p>error</p>}
      <Link to='/addNewProduct'>Add new product</Link>
      {data && <ProductsList products={data} />}
    </div>
  )
}

export default Products