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

/** Значения полей формы общие*/
export interface IFormDataGeneral {
	treaty: IInputData
	number: IInputData
	status: IInputData
	sides: SideDataExtended[]
	conclusionDate: IInputData
	startDate: IInputData
	endDate: IInputData
}

/** Значения полей формы */
export interface IFormData extends IFormDataGeneral {
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
	sides: SideDataExtended[]
}

/** Значения полей формы ЛПУ */
export interface IFormDataLPU extends IFormDataGeneral {
	/** Договор */
	treaty: IInputData
	/** Номер */
	number: IInputData
	/** ЛПУ */
	lpu: IInputData
	/** Тип договора */
	type: IInputData
	/** Статус */
	status: IInputData
	/** Дата заключения */
	conclusionDate: IInputData
	/** Дата начала действия */
	startDate: IInputData
	/** Дата окончания действия */
	endDate: IInputData
	/** Стороны */
	sides: SideDataExtended[]
}

/** Данные столбца таблицы */
export class ListColumnData {
	/** Коэффициент соотношения ширины столбца */
	fr: number
	/** Можно ли по этому столбцу сортировать */
	isSortable: boolean
	/** Хранит ли по столбец ссылки */
	isLink: boolean
	/** Название столбца */
	name: string
	/** Код значения */
	code: string
	/** Обработчик нажатия */
	onClick?: (props: any) => any

	constructor({
		name,
		code,
		fr,
		isSortable,
		isLink,
		onClick,
	}: {
		name: string
		code: string
		fr?: number
		isSortable?: boolean
		isLink?: boolean
		onClick?: (props: any) => any
	}) {
		this.fr = fr ?? 1
		this.isSortable = isSortable ?? false
		this.isLink = isLink ?? false

		if (onClick) this.onClick = onClick

		this.name = name
		this.code = code
	}
}

export interface CustomInputProps extends React.ComponentProps<'input'> {
	values: { [key: string]: any }
	name: string
	buttons?: any
	inputHandler?: (name: string, value: any) => void
	clickHandler?: (ev) => void
	cursor?: string
	isOpen?: boolean
	wrapperRef?: React.RefObject<HTMLDivElement>
	readOnly?: boolean
	isViewMode?: boolean
	placeholder?: string
	maskFunction?: (value: string) => string
	getValueHandler?: (props: CustomInputProps) => string
	isInvalid?: boolean
	customClassname?: string
}

/** Сторона (С сохранением изначального состояния данных) */
export class SideDataExtended {
	originalData: SideData
	actualData: SideData
	isEdit: boolean

	constructor(isEdit?: boolean) {
		// this.isEdit = !!isEdit
		this.originalData = new SideData()
		this.actualData = new SideData()
		this.isEdit = !!isEdit
	}
}

/** Сторона */
export class SideData {
	type: InputDataCategory
	contractor: InputDataString
	// isEdit: boolean

	constructor(/* isEdit?: boolean */) {
		// this.isEdit = !!isEdit
		this.type = new InputDataCategory()
		this.contractor = new InputDataString()
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

	sides: SideDataExtended[]

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
		this.region = new InputDataCategory()
		this.conclusionDate = new InputDataString()
		this.startDate = new InputDataString()
		this.endDate = new InputDataString()
		this.insuranceAmount = new InputDataString()
		this.insuranceAmountRub = new InputDataString()
		this.insurancePremium = new InputDataString()
		this.insurancePremiumRub = new InputDataString()
	}
}

/** Значения полей формы ЛПУ с уточненными типами полей */
export class TreatyFormLPUData implements IFormDataLPU {
	treaty: IInputData
	number: IInputData
	lpu: IInputData
	status: IInputData
	conclusionDate: IInputData
	startDate: IInputData
	endDate: IInputData
	sides: SideDataExtended[]
	type: IInputData

	constructor() {
		this.treaty = new InputDataCategory()
		this.status = new InputDataCategory()

		this.number = new InputDataString()
		this.lpu = new InputDataString()
		this.conclusionDate = new InputDataString()
		this.startDate = new InputDataString()
		this.endDate = new InputDataString()
		this.type = new InputDataString()
	}
}

/** Значение поискового запроса */
export class InsuredSearchData {
	/** Категория */
	category: InputDataCategory

	/** ФИО */
	fullname: InputDataString
	/** Дата рождения */
	birthDate: InputDataString
	/** Номер полиса */
	policyNumber: InputDataString
	/** Дата начала */
	startDate: InputDataString
	/** Дата окончания */
	endDate: InputDataString
	/** План */
	plan: InputDataString
	/** ДС */
	additionalAgreement: InputDataString

	constructor() {
		this.category = new InputDataCategory()
		this.fullname = new InputDataString()
		this.birthDate = new InputDataString()
		this.policyNumber = new InputDataString()
		this.startDate = new InputDataString()
		this.endDate = new InputDataString()
		this.plan = new InputDataString()
		this.additionalAgreement = new InputDataString()
	}
}

/** Данные сортировки */
export class SortData {
	code: string
	isAscending: boolean

	constructor({ code, isAscending }: { code?: string; isAscending?: boolean }) {
		this.code = code ?? ''
		this.isAscending = isAscending ?? true
	}
}

export interface TabProps {
	handler: any
	values: IFormData
	isViewMode: boolean
	saveStateHandler: () => void
	setActionHandlers: {
		setAddHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>
		setEditHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>
		setDeleteHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>
	}
}

export interface DetailsProps {
	data: any
	values: any
}

/** Атрибуты функции получения разметки деталей строки динамического списка */
export interface getDetailsLayoutAttributes {
	/** Сокращенные данные строки */
	rowData?: any
	/** Обработчик нажатия на строку */
	onClickRowHandler?: any
	/** Перезагрузка списка */
	reloadData: () => void
}

/** Детальные данные Плана страхования */
export class PlanDetailsData {
	/** Номер */
	planNumber: InputDataString
	/** Дата начала */
	startDate: InputDataString
	/** Дата окончания */
	endDate: InputDataString
	/** Тип ЗХ */
	// insuranceType: InputDataCategory
	insuranceType: InputDataCategory[]

	/** Возрастной коэффициент */
	ageFactor: InputDataString

	/** Возраст, от */
	startAge: InputDataString
	/** Единица измерения возраста от */
	startAgeMeasurement: InputDataString
	/** Возраст, до */
	endAge: InputDataString
	/** Единица измерения возраста, до */
	endAgeMeasurement: InputDataString

	/** Страховая премия по плану на 1 ЗХ, год */
	insurancePremium: InputDataString
	/** Наименование */
	name: InputDataString
	/** Предыдущий план */
	previousPlan: InputDataCategory
	/** Коэффициент на родственника */
	relativeFactor: InputDataString
	/** Страховая сумма по плану на 1 ЗХ, год */
	insuranceAmount: InputDataString
	/** Тип плана */
	type: InputDataCategory
	/** Родительский план */
	parentPlan: InputDataCategory
	/** Основной регион */
	region: InputDataCategory
	/** Медицинский коэффициент */
	medicalFactor: InputDataString

	constructor() {
		this.planNumber = new InputDataString()
		this.startDate = new InputDataString()
		this.endDate = new InputDataString()
		// this.insuranceType = new InputDataCategory()
		this.insuranceType = []
		this.ageFactor = new InputDataString()
		this.startAge = new InputDataString()
		this.startAgeMeasurement = new InputDataString()
		this.endAge = new InputDataString()
		this.endAgeMeasurement = new InputDataString()
		this.insurancePremium = new InputDataString()
		this.name = new InputDataString()
		this.previousPlan = new InputDataCategory()
		this.relativeFactor = new InputDataString()
		this.insuranceAmount = new InputDataString()
		this.type = new InputDataCategory()
		this.parentPlan = new InputDataCategory()
		this.region = new InputDataCategory()
		this.medicalFactor = new InputDataString()
	}
}

/** Детальные данные Программы страхования */
export class ProgramDetailsData {
	/** Наименование */
	name: InputDataString
	/** Номер */
	number: InputDataString
	/** Риск / Спец.Риск */
	riskType: InputDataCategory
	/** Тип программы страхования */
	type: InputDataCategory
	/** Маркетинговое наименование */
	marketingName: InputDataString
	/** Валюта ответственности */
	currency: InputDataCategory

	constructor() {
		this.name = new InputDataString()
		this.number = new InputDataString()
		this.marketingName = new InputDataString()

		this.riskType = new InputDataCategory()
		this.type = new InputDataCategory()
		this.currency = new InputDataCategory()
	}
}

/** Детальные данные Застрахованного */
export class InsuredDetailsData {
	/** ФИО */
	fullname: InputDataCategory
	/** Категория */
	category: InputDataCategory
	/** Текущий план */
	currentPlan: InputDataCategory
	/** Номер договора */
	contractNumber: InputDataCategory
	/** Дата прикрепления */
	startDate: InputDataString
	/** Дата открепления */
	endDate: InputDataString
	/** Прикреплен */
	attach: InputDataCategory
	/** Номер полиса */
	policyNumber: InputDataString
	/** Дата начала действия полиса */
	policyStartDate: InputDataString
	/** Дата окончания действия полиса */
	policyEndDate: InputDataString
	/** Откреплен */
	detach: InputDataCategory

	constructor() {
		this.fullname = new InputDataCategory()
		this.startDate = new InputDataString()
		this.endDate = new InputDataString()
		this.attach = new InputDataCategory()
		this.policyNumber = new InputDataString()
		this.policyStartDate = new InputDataString()
		this.policyEndDate = new InputDataString()
		this.detach = new InputDataCategory()

		this.category = new InputDataCategory()
		this.currentPlan = new InputDataCategory()
		this.contractNumber = new InputDataCategory()
	}
}

/** Детальные данные ДС */
export class AmendmentDetailsData {
	contract: InputDataCategory
	amendment: InputDataCategory
	conclusionDate: InputDataString
	amendmentType: InputDataCategory
	startDate: InputDataString
	endDate: InputDataString
	status: InputDataCategory

	constructor() {
		this.contract = new InputDataCategory()
		this.amendment = new InputDataCategory()
		this.conclusionDate = new InputDataString()
		this.amendmentType = new InputDataCategory()
		this.startDate = new InputDataString()
		this.endDate = new InputDataString()
		this.status = new InputDataCategory()
	}
}
