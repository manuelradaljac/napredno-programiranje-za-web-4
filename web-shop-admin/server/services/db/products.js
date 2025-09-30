import { db } from "../../index.js";

export async function getCategories() {
  const getCategoriesQuery = 'select id,name from categories'
 const [results, fields] = await db.execute(getCategoriesQuery)
 console.log('categories:', results)
}  