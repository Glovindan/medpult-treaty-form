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
	/** Договор */
	treaty: IInputData
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
	/** Стороны */
	sides: SideData[]
}

export interface CustomInputProps extends React.ComponentProps<'input'> {
	values: IFormData
	name: string
	buttons?: any
	inputHandler?: (name: string, value: IInputData) => void
	clickHandler?: () => void
	cursor?: string
	isOpen?: boolean
	wrapperRef?: React.RefObject<HTMLDivElement>
	readOnly?: boolean
	isViewMode?: boolean
	placeholder?: string
	maskFunction?: (value: string) => string
	getValueHandler?: (props: CustomInputProps) => string
}

/** Сторона */
export class SideData {
	type: InputDataCategory
	contractor: InputDataCategory
	isEdit: boolean

	constructor(isEdit?: boolean) {
		this.isEdit = !!isEdit
		this.type = new InputDataCategory()
		this.contractor = new InputDataCategory()
	}
}

/** Значение поля ввода типа Строка */
export class InputDataString implements IInputData {
	value: string
	data: null

	constructor(value?: string) {
		this.value = value ?? ''
	}
}

/** Значение поля ввода типа Категория */
export class InputDataCategory implements IInputData {
	value: string
	data: {
		code: string
	}

	constructor(value?: string, code?: string) {
		this.value = value ?? ''
		this.data = { code: code ?? '' }
	}
}

/** Значения полей формы с уточненными типами полей */
export class TreatyFormData implements IFormData {
	treaty: InputDataCategory
	objProduct: InputDataCategory
	channel: InputDataCategory
	currency: InputDataCategory
	status: InputDataCategory

	sides: SideData[]

	number: IInputData
	policyHolder: IInputData
	region: IInputData
	conclusionDate: IInputData
	startDate: IInputData
	endDate: IInputData
	insuranceAmount: IInputData
	insuranceAmountRub: IInputData
	insurancePremium: IInputData
	insurancePremiumRub: IInputData

	constructor() {
		this.treaty = new InputDataCategory()
		this.objProduct = new InputDataCategory()
		this.channel = new InputDataCategory()
		this.currency = new InputDataCategory()
		this.status = new InputDataCategory()

		this.number = new InputDataString()
		this.policyHolder = new InputDataString()
		this.region = new InputDataString()
		this.conclusionDate = new InputDataString()
		this.startDate = new InputDataString()
		this.endDate = new InputDataString()
		this.insuranceAmount = new InputDataString()
		this.insuranceAmountRub = new InputDataString()
		this.insurancePremium = new InputDataString()
		this.insurancePremiumRub = new InputDataString()
	}
}
