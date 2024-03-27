/** Заглушка ожидания ответа сервера */
function randomDelay() {
	const delay = Math.random() * 1000
	return new Promise((resolve) => {
		setTimeout(resolve, delay)
	})
}

/** Получение списка продуктов */
async function getProducts() {
	const data = [
		{
			'value': 'placeholder 1',
			'data': {
				'id': '018e7fa6-010e-712b-aecd-d07441142e97',
			},
		},
		{
			'value': 'placeholder 2',
			'data': {
				'id': '018e7fa6-46b6-7345-927e-d07cb06e3107',
			},
		},
		{
			'value': 'placeholder 3',
			'data': {
				'id': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
			},
		},
	]

	await randomDelay()
	return data
}

export default {
	getProducts,
}
