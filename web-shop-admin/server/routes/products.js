import express from 'express'
const router = express.Router()
import { z } from 'zod'
import { db } from '../index.js'
import { getCategories } from '../services/db/products.js'
 // Define validation schemas
const updateProductSchema = z.object({
  id: z.number().min(0),
  name: z.string().min(5),
  price: z.number().min(0),
  stock: z.number().min(0),
  specs: z.string().optional().default(''),
  warranty: z.number().optional().default(24),
  description: z.string().optional().default('')
})

const createProductSchema = updateProductSchema.extend({
  id: z.number().optional(),
  category_id: z.number().min(1)
})

// Define user routes
// Get all products
router.get("/", async (req, res) => {
  const productName = req.query.product_name ?? ''
  console.log('product name:', productName)
  try {
    const [result, fields] = await db.query(`select * from products
           where name like '%${productName}%';`)
    res.json(result)
  } catch (error) {
    res.status(404).json('error')
  }
});

router.get('/productDetails', async (req, res) => {
  const productId = parseInt(req.query.id)
  if (isNaN(productId)) {
    res.status(404).json({ message: 'Product not found' })
    return
  }
  const getProductByIdQuery = `select * from products
  where id = ?`
  try {
    const [result, fields] = await db.execute(getProductByIdQuery, [productId])
    const product = result[0]
    const productWithPriceInNumber = { ...product, price: Number(product.price) }
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
        await getCategories()
    return res.json(productWithPriceInNumber)

  } catch (error) {
    return res.status(404).json({ message: 'Product not found' })
  }
})

router.put('/', async (req, res) => {
  const validationResult = updateProductSchema.safeParse(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      error: 'Validation error',
      issues: validationResult.error.errors
    })
  }
  const updatedProduct = validationResult.data
  const updateProductQuery = `update products
  set name = ?, price = ?, stock = ?, specs = ?, warranty = ?, description = ?
  where id = ?`
  try {
    const [results, fields] = await db.execute(updateProductQuery, [
      updatedProduct.name,
      updatedProduct.price.toString(),
      updatedProduct.stock.toString(),
      updatedProduct.specs,
      updatedProduct.warranty.toString(),
      updatedProduct.description,
      updatedProduct.id.toString()
    ])
    return res.status(204).json()
  } catch (error) {
    return res.status(500).json()
  }
})

router.post('/', async (req, res) => {

  const validationResult = createProductSchema.safeParse(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      error: 'Validation error',
      issues: validationResult.error.errors
    })
  }
  const { name, description, category_id, price, stock, specs, warranty } = validationResult.data
  const insertNewProductQuery = `insert into products (name, price, stock, category_id, specs, warranty, description)
                                 values (?, ?, ?, ?, ?, ?, ?)`
  try {
    const [result, fields] = await db.execute(insertNewProductQuery, [name, price, stock, category_id, specs, warranty, description])
    console.log('Add new product result', result)
    console.log('Base url:', req.baseUrl)
    const addedProductUrl = `http://localhost:3000/products/productDetails?id=${result.insertId}`
    return res.json({ status: 'success', productUrl: addedProductUrl })
  } catch (error) {
    return res.status(403).json()
  }
})

export default router
