// /** Тип категория/элемент приложения */
// export interface ICategory {
// 	/** Код или идетификатор */
// 	code: string
// 	/** Название */
// 	name: string
// }

export interface IInputData {
	value: string
	data?: any
}

/** Значения полей формы */
export interface IFormData {
	/** Номер */
	number: IInputData
	/** Страхователь */
	policyHolder: IInputData
	/** Продукт */
	objProduct: IInputData
	/** Канал продажи */
	channel: IInputData
	/** Регион заключения */
	region: IInputData
	/** Валюта договора */
	currency: IInputData
	/** Статус */
	status: IInputData
	/** Дата заключения */
	conclusionDate: IInputData
	/** Дата начала действия */
	startDate: IInputData
	/** Дата окончания действия */
	endDate: IInputData
	/** Страховая сумма по договору */
	insuranceAmount: IInputData
	/** Страховая сумма по договору, руб */
	insuranceAmountRub: IInputData
	/** Страховая премия по договору */
	insurancePremium: IInputData
	/** Страховая премия по договору, руб */
	insurancePremiumRub: IInputData
}

export interface CustomInputProps {
	name: string
	buttons?: any
	values: IFormData
	inputHandler?: any
	clickHandler?: () => void
	cursor?: string
	isOpen?: boolean
	wrapperRef?: React.RefObject<HTMLDivElement>
	readOnly?: boolean
}
