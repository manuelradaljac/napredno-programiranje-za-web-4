import { db } from "../../index.js";

export async function getCategories() {
    const selectAllCategoriesQuery = 'select id, name from categories'
    const [result, fields] = await db.execute(selectAllCategoriesQuery)
    return result
}