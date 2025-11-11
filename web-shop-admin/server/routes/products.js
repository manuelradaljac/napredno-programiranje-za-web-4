import express from 'express'
const router = express.Router()
import { z } from 'zod'
import { db } from '../index.js'
import { addProduct, getCategories, getProductById, getProductsByName, updateProduct } from '../services/db/products.js'

const updateProductSchema = z.object({
  id: z.number().min(1),
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

function returnErrorResponse(res) {
  // to add error logging
  res.status(404).json('api error')
}

// Define user routes
// Get all products
router.get("/", async (req, res) => {
  const productName = req.query.product_name ?? ''
  try {
    const result = await getProductsByName(productName)
    res.json(result)
  } catch (error) {
    returnErrorResponse(res)
  }
});

router.get('/productDetails', async (req, res) => {
  const productId = parseInt(req.query.id)
  if (isNaN(productId)) {
    res.status(404).json({ message: 'Product not found' })
    return
  }
  try {
    const product = await getProductById(productId)
        if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    const categories = await getCategories()
    const productWithPriceInNumber = { ...product, price: Number(product.price) }
    const productDetailsWithCategories = {
      categories: categories,
      product: productWithPriceInNumber
    }
    return res.json(productDetailsWithCategories)
  } catch (error) {
    return returnErrorResponse(res)
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
  const validProduct = validationResult.data
  try {
    await updateProduct(validProduct)
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
  const validProduct = validationResult.data

  try {
    const insertResult = await addProduct(validProduct)
    // console.log('Base url:', req.baseUrl)
    const addedProductUrl = `http://localhost:3000/products/productDetails?id=${insertResult.insertId}`
    return res.json({ status: 'success', productUrl: addedProductUrl })
  } catch (error) {
    return res.status(403).json()
  }
})
export default router