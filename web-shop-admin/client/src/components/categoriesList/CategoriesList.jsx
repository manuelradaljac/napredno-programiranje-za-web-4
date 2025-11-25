import React from "react";
import styles from "./CategoriesList.module.css";
import { Link } from "react-router-dom";

const CategoriesList = ({ categories }) => {
  return (
    <div className={styles.container}>
      <div className={styles.table_container}>
        <table className={styles.custom_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <Link to={`/editCategory/${category.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesList;
