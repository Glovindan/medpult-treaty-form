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

/** Получение списка каналов */
async function getChannels() {
	const data = [
		{
			'value': 'СБОЛ',
			'data': {
				'id': '018e7fa6-010e-712b-aecd-d07441142e97',
			},
		},
		{
			'value': 'БУБУБУ',
			'data': {
				'id': '018e7fa6-46b6-7345-927e-d07cb06e3107',
			},
		},
		{
			'value': 'ВСТАВИТЬ ТЕКСТ',
			'data': {
				'id': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
			},
		},
	]

	await randomDelay()
	return data
}

/** Получение списка валют */
async function getCurrencies() {
	const data = [
		{
			'value': 'RUB',
			'data': {
				'id': '018e7fa6-010e-712b-aecd-d07441142e97',
			},
		},
		{
			'value': 'USD',
			'data': {
				'id': '018e7fa6-46b6-7345-927e-d07cb06e3107',
			},
		},
		{
			'value': 'EUR',
			'data': {
				'id': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
			},
		},
	]

	await randomDelay()
	return data
}

/** Получение списка статусов */
async function getStatuses() {
	const data = [
		{
			'value': 'RUB',
			'data': {
				'id': '018e7fa6-010e-712b-aecd-d07441142e97',
			},
		},
		{
			'value': 'USD',
			'data': {
				'id': '018e7fa6-46b6-7345-927e-d07cb06e3107',
			},
		},
		{
			'value': 'EUR',
			'data': {
				'id': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
			},
		},
	]

	await randomDelay()
	return data
}

/** Получение списка статусов */
async function saveTreaty(data) {
	await randomDelay()
	console.log(data)
}

/** Получение списка статусов */
async function getTreaty() {
	const data = {
		'number': {
			'value': 'test',
		},
		'policyHolder': {
			'value': '',
		},
		'objProduct': {
			'value': 'Aenean tellus elit leo consectetur',
			'data': {
				'code': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
			},
		},
		'channel': {
			'value': 'channelTest',
			'data': {
				'code': 'channelTest',
			},
		},
		'region': {
			'value': '',
		},
		'currency': {
			'value': 'currencyTest',
			'data': {
				'code': 'currencyTest',
			},
		},
		'status': {
			'value': 'Еще статус',
			'data': {
				'code': 'eshe_status',
			},
		},
		'conclusionDate': {
			'value': '28.03.2024',
		},
		'startDate': {
			'value': '28.03.2024',
		},
		'endDate': {
			'value': '28.03.2024',
		},
		'insuranceAmount': {
			'value': '',
		},
		'insuranceAmountRub': {
			'value': '',
		},
		'insurancePremium': {
			'value': '',
		},
		'insurancePremiumRub': {
			'value': '',
		},
	}
	await randomDelay()
	return data
}

export default {
	getProducts,
	getChannels,
	getCurrencies,
	getStatuses,
	saveTreaty,
	getTreaty,
}
