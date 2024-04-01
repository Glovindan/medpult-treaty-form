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
				'code': '018e7fa6-010e-712b-aecd-d07441142e97',
			},
		},
		{
			'value': 'placeholder 2',
			'data': {
				'code': '018e7fa6-46b6-7345-927e-d07cb06e3107',
			},
		},
		{
			'value': 'placeholder 3',
			'data': {
				'code': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
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
				'code': '018e7fa6-010e-712b-aecd-d07441142e97',
			},
		},
		{
			'value': 'БУБУБУ',
			'data': {
				'code': '018e7fa6-46b6-7345-927e-d07cb06e3107',
			},
		},
		{
			'value': 'ВСТАВИТЬ ТЕКСТ',
			'data': {
				'code': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
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
				'code': '018e7fa6-010e-712b-aecd-d07441142e97',
			},
		},
		{
			'value': 'USD',
			'data': {
				'code': '018e7fa6-46b6-7345-927e-d07cb06e3107',
			},
		},
		{
			'value': 'EUR',
			'data': {
				'code': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
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
				'code': '018e7fa6-010e-712b-aecd-d07441142e97',
			},
		},
		{
			'value': 'USD',
			'data': {
				'code': '018e7fa6-46b6-7345-927e-d07cb06e3107',
			},
		},
		{
			'value': 'EUR',
			'data': {
				'code': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
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
		'treaty': {
			'value': 'test',
			'data': {
				'code': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
			},
		},
		'number': {
			'value': 'test',
		},
		'policyHolder': {
			'value': 'test',
			'data': {
				'code': '018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3',
			},
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
			'value': 'test',
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
		'sides': [
			{
				'isEdit': false,
				'type': {
					'value': 'Менеджер договора',
					'data': {
						'code': 'manager',
					},
				},
				'contractor': {
					'value': 'Иванов Иван Иванович',
					'data': {
						'code': '123456',
					},
				},
			},
			{
				'isEdit': false,
				'type': {
					'value': 'Медицинский куратор',
					'data': {
						'code': 'medical',
					},
				},
				'contractor': {
					'value': 'Петров Петр Петрович',
					'data': {
						'code': '42515215',
					},
				},
			},
			{
				'isEdit': true,
				'type': {
					'value': 'Технический куратор',
					'data': {
						'code': 'technical',
					},
				},
				'contractor': {
					'value': 'Плюшкин Лев Николаевич',
					'data': {
						'code': '4643645654',
					},
				},
			},
		],
	}
	await randomDelay()
	return data
}

/** Получение ссылки на форму отбора контрагента */
const getSelectContractorPageLink = () => {
	return '#test'
}

/** Получение подсказок по адресу */
const getAddressSuggestion = async (value) => {
	const addresses = [
		{
			'value': 'г Полный адрес, улица Полная, д12 кв34',
			'isFull': true,
		},
		{
			'value': 'г Неполный адрес',
			'isFull': false,
		},
	]
	await randomDelay()
	return addresses
}

/** Получение типов ответственного лица */
const getResponsibleTypes = async (value) => {
	const types = [
		{
			'value': 'Менеджер договора',
			'data': {
				'code': 'manager',
			},
		},
		{
			'value': 'Медицинский куратор',
			'data': {
				'code': 'medical',
			},
		},
		{
			'value': 'Технический куратор',
			'data': {
				'code': 'technical',
			},
		},
	]
	await randomDelay()
	return types
}

export default {
	getProducts,
	getChannels,
	getCurrencies,
	getStatuses,
	saveTreaty,
	getTreaty,
	getSelectContractorPageLink,
	getAddressSuggestion,
	getResponsibleTypes,
}
