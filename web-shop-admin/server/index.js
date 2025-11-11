import express from 'express'
import mysql from 'mysql2/promise'
import productRoutes from './routes/products.js';
import productCategoriesRoutes from './routes/product-categories.js'
import cors from 'cors'

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// Create the connection to database
export const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'webshop',
  password: 'password'
});

app.locals.db = db

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Using routes
app.use('/products', productRoutes);
app.use('/categories', productCategoriesRoutes)




