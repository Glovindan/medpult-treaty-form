import Scripts from './clientScripts'

/** Получение списка продуктов */
async function getProducts() {
	const products = await Scripts.getProducts()
	return products
}

export default {
	getProducts,
}
