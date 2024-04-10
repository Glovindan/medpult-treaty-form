import React, { ButtonHTMLAttributes, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { InputDataCategory, InputDataString, ListColumnData, SortData } from '../../shared/types'
import icons from '../../shared/icons'
import CustomListColumn from './CustomListHeaderColumn/CustomListHeaderColumn'
import Loader from '../Loader/Loader'
import CustomListRow from './CustomListRow/CustomListRow'

type ListProps = {
	columnsSettings: ListColumnData[]
	getDataHandler: any
	searchData?: any
	setSearchHandler?: any
}

function CustomList(props: ListProps) {
	const { columnsSettings, getDataHandler, searchData, setSearchHandler } = props;

	const [page, setPage] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [sortData, setSortData] = useState<SortData>();
	const [items, setItems] = useState<any[]>([]);
	const bodyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log(searchData)
	}, [searchData])

	const reloadData = () => {
		setIsLoading(false);
		setItems([])

		loadData();
	}

	useEffect(() => {
		console.log(items);
	}, [items])

	const loadData = async (items: any[] = [], page: number = 0, hasMore: boolean = true) => {
		if (isLoading) return;
		if (!hasMore) return;

		setIsLoading(true);

		const fetchData = await getDataHandler(page, sortData, searchData);
		setHasMore(fetchData.hasMore)

		setItems([...items, ...fetchData.data])
		setPage(page + 1);
		setIsLoading(false);
	}

	const onScroll = () => {
		const body = bodyRef.current!;
		const height = body.scrollHeight - body.offsetHeight;
		const scrollPosition = body.scrollTop;

		if ((height - scrollPosition) / height < 0.05 && !isLoading) {
			loadData(items, page, hasMore)
		}
	}

	// Установить обработчик нажатия на кнопку поиск
	useEffect(() => {
		if (!setSearchHandler) return;

		setSearchHandler(() => () => { reloadData() });
	}, [searchData])

	// Обновление оглавления при изменении сортировки
	useEffect(() => {
		reloadData();
	}, [sortData])

	// Нажатие на сортировку
	const handleSortClick = (sortDataNew: SortData | undefined) => {
		setSortData(sortDataNew);
	}

	return (
		<div className='custom-list'>
			<div className="custom-list__header">
				{columnsSettings.map(columnSettings =>
					<CustomListColumn
						sortData={sortData}
						handleSortClick={handleSortClick}
						{...columnSettings}
					/>
				)}
			</div>
			<div className="custom-list__body" ref={bodyRef} onScroll={onScroll}>
				{items.map(data => <CustomListRow data={data} columnsSettings={columnsSettings} />)}
				{isLoading && <Loader />}
			</div>
		</div>
	)
}

export default CustomList
