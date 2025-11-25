import { db } from "../../index.js";

export async function getCategories() {
    const selectAllCategoriesQuery = 'select id, name from categories'
    const [result, fields] = await db.execute(selectAllCategoriesQuery)
    return result
}

export async function getProductsByName(productName) {
    const [result, fields] = await db.query(`select * from products
           where name like '%${productName}%';`)
    return result
}

export async function getProductById(productId) {
    const getProductByIdQuery = `select id,
    name,
    stock,
    price,
    category_id as categoryId,
    likes,
    specs,
    warranty,
    description
    from products
    where id = ?;`
    const [result, fields] = await db.execute(getProductByIdQuery, [productId])
    return result[0]
}

export async function updateProduct(product) {
    const updateProductQuery = `update products
    set name = ?,
    price = ?,
    stock = ?,
    specs = ?,
    warranty = ?,
    description = ?,
    category_id = ?
    where id = ?`
    const [results, fields] = await db.execute(updateProductQuery, [
        product.name,
        product.price.toString(),
        product.stock.toString(),
        product.specs,
        product.warranty.toString(),
        product.description,
        product.categoryId,
        product.id.toString()
    ])
}

export async function addProduct(product) {
    const insertNewProductQuery = `insert into products (name, price, stock, category_id, specs, warranty, description)
                                 values (?, ?, ?, ?, ?, ?, ?)`
    const [result, fields] = await db.execute(insertNewProductQuery, [
        product.name,
        product.price,
        product.stock,
        product.categoryId,
        product.specs,
        product.warranty,
        product.description])
    return result
}
