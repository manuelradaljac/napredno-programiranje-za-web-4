import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";
import useFetch from "../../hooks/useFetch";
import CategoriesList from "../../components/categoriesList/CategoriesList";

const Categories = () => {
  const inputElementRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isPending } = useFetch(
    `http://localhost:3000/categories?category_name=${searchTerm}`
  );

  function handleSearch() {
    const inputValue = inputElementRef.current.value;
    setSearchTerm(inputValue);
  }

  const dummyCategories = [
    { id: 1, name: "Fridges" },
    { id: 2, name: "Smartphones" },
    { id: 3, name: "Printers" },
  ];

  return (
    <div>
      <div className={styles.search_div}>
        <input
          type="text"
          className={styles.search_products_input}
          ref={inputElementRef}
        />
        <button className={styles.search_btn} onClick={handleSearch}>
          <img
            className={styles.search_img}
            src="/images/search-icon.png"
            alt=""
          />
        </button>
      </div>
      {isPending && <p>Loading...</p>}
      {error && <p>error</p>}
      <Link to="/addNewCategory">Add new category</Link>
      {dummyCategories && <CategoriesList categories={dummyCategories} />}
    </div>
  );
};

export default Categories;
