import express from 'express'
const router = express.Router()
import { z } from 'zod'
import { getCategories } from '../services/db/product-categories-repository.js' 

router.get('/', async (req, res) => {
    try {
        const result = await getCategories()
        res.json(result)
    } catch (error) {
        return res.status(400).json('api error')
    }
})

export default router


