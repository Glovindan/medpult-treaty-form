import React, { ButtonHTMLAttributes, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { InputDataCategory, InputDataString, ListColumnData, SortData } from '../../shared/types'
import icons from '../../shared/icons'
import CustomListColumn from './CustomListHeaderColumn/CustomListHeaderColumn'
import Loader from '../Loader/Loader'
import CustomListRow from './CustomListRow/CustomListRow'

type ListProps = {
	columnsSettings: ListColumnData[]
	getDataHandler: any
}

function CustomList(props: ListProps) {
	const { columnsSettings, getDataHandler } = props;

	const [page, setPage] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [sortData, setSortData] = useState<SortData>();
	const [columnsLayout, setColumnsLayout] = useState<React.JSX.Element[]>();
	const [rowsLayout, setRowsLayout] = useState<React.JSX.Element[]>();
	const bodyRef = useRef<HTMLDivElement>(null);

	// Обновление оглавления при изменении сортировки
	useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		if (isLoading) return;

		setIsLoading(true);

		const data = await getDataHandler(page);
		const rows = data.map(data => (
			<CustomListRow data={data} columnsSettings={columnsSettings} />
		))
		setRowsLayout([rowsLayout, ...rows])

		setIsLoading(false);
	}

	const onScroll = () => {
		const body = bodyRef.current!;
		const height = body.scrollHeight - body.offsetHeight;
		const scrollPosition = body.scrollTop;

		if ((height - scrollPosition) / height < 0.05 && (height - scrollPosition) / height > 0.01) {
			loadData()
		}
	}


	// Обновление оглавления при изменении сортировки
	useEffect(() => {
		const data = getDataHandler();
		// Оглавление списка
		const columnsLayout = columnsSettings.map(columnSettings =>
			<CustomListColumn
				sortData={sortData}
				handleSortClick={handleSortClick}
				{...columnSettings}
			/>
		)

		setColumnsLayout(columnsLayout)
		setPage(0)
	}, [sortData])

	// Нажатие на сортировку
	const handleSortClick = (sortDataNew: SortData | undefined) => {
		setSortData(sortDataNew);
	}

	// const mockData = {
	// 	fullname: new InputDataCategory("Иванов Иван Иванович", "test"),
	// 	birthDate: new InputDataString("22.22.2222"),
	// 	policyNumber: new InputDataString("22.22.2222"),
	// 	category: new InputDataCategory("Gold", "test"),
	// 	startDate: new InputDataString("22.22.2222"),
	// 	endDate: new InputDataString("22.22.2222"),
	// 	plan: new InputDataString("ОНКО-ТКМ-МИР-Г-0-17"),
	// 	additionalAgreement: new InputDataString("001СБС00123456/2023ДМС-00"),
	// }

	return (
		<div className='custom-list'>
			<div className="custom-list__header">
				{columnsLayout}
			</div>
			<div className="custom-list__body" ref={bodyRef} onScroll={onScroll}>
				{rowsLayout}
				{isLoading && <Loader />}
			</div>
		</div>
	)
}

export default CustomList
