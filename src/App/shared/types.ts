/** Тип категория/элемент приложения */
export interface ICategory {
	/** Код или идетификатор */
	code: string
	/** Название */
	name: string
}

export interface IFormData {
	/** Номер */
	number: string
	/** Страхователь */
	policyHolder: string
	/** Продукт */
	objProduct: string
	/** Канал продажи */
	channel: string
	/** Регион заключения */
	region: string
	/** Валюта договора */
	currency: string
	/** Статус */
	status: string
	/** Дата заключения */
	conclusionDate: string
	/** Дата начала действия */
	startDate: string
	/** Дата окончания действия */
	endDate: string
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
