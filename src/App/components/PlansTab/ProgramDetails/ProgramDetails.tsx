import React, { useState } from 'react';
import { DetailsProps, ListColumnData, ProgramDetailsData, SortData } from '../../../shared/types';
import CustomList from '../../CustomList/CustomList';
import CustomListRow from '../../CustomList/CustomListRow/CustomListRow';
import Scripts from '../../../shared/utils/clientScripts';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';
import ProgramDetailsGeneralTab from '../ProgramDetailsGeneralTab/ProgramDetailsGeneralTab';

class ProgramDetailsProps implements DetailsProps {
	data: any;
	values: ProgramDetailsData;
	setValue: (name: string, value: any) => void
	setValues: (values: ProgramDetailsData) => void
	columnsSettings: ListColumnData[];
	onClickRowHandler: () => any
	reloadData: () => void
}

/** Форма редактирования/просмотра плана страхования */
function ProgramDetails(props: ProgramDetailsProps) {
	const { data, values, setValue, setValues, columnsSettings, onClickRowHandler, reloadData } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isViewMode, setIsViewMode] = useState<boolean>(true);

	React.useLayoutEffect(() => {
		setIsLoading(true)
		// Получить полные данные по data.id 
		Scripts.getProgramFulldata(data.id).then(fullData => {
			setIsLoading(false)
			// Присвоить полные данные в состояние
			setValues(fullData as any)
		})
	}, [])

	/** Колонки списка ВМП */
	const columns = [
		new ListColumnData({ name: "ВМП", code: "name", fr: 2, isSortable: true }),
		new ListColumnData({ name: "Стоимость риска в год", code: "riskAmount", fr: 2, isSortable: true }),
		new ListColumnData({ name: "Страховая сумма на 1 3х, год", code: "insuranceAmount", fr: 2, isSortable: true }),
		new ListColumnData({ name: "Временная франшиза, дни", code: "timeFranchise", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Франшиза %", code: "riskFranchise", fr: 1, isSortable: true }),
	]

	/** Получение рисков по идентификатору программы */
	const getRisks = (page: number, sortData: SortData) => {
		return Scripts.getRisks(data.id, sortData);
	}


	/** Нажатие на кнопку Изменить */
	const onClickEdit = () => {
		setIsViewMode(false)
	}

	/** Нажатие на кнопку сохранить */
	const onClickSave = async () => {
		await Scripts.saveProgram(data.id, values);
		setIsViewMode(true)
		reloadData()
	}

	const formActionButton = (
		isViewMode
			? <Button clickHandler={onClickEdit} buttonType='outline' title='ИЗМЕНИТЬ' />
			: <Button clickHandler={onClickSave} buttonType='outline' title='СОХРАНИТЬ' />
	)

	return (
		<>
			<CustomListRow
				data={data}
				columnsSettings={columnsSettings}
				setOpenRowIndex={onClickRowHandler}
				isClickable
				isOpen
				reloadData={function () { }}
			/>
			{
				isLoading
					? (<div className="program-details">
						< Loader />
					</div>)
					: (<div className="program-details">
						<div className="program-details__tabs">
							<ProgramDetailsGeneralTab {...props} isViewMode={isViewMode} />
						</div>
						<div className="program-details__actions">
							{formActionButton}
							<Button clickHandler={onClickRowHandler} title='ЗАКРЫТЬ' />
						</div>
						<div className="program-details__programs">
							<div className="program-details__programs-title">
								<span>Виды медицинской помощи</span>
							</div>
							<CustomList columnsSettings={columns} getDataHandler={getRisks} isScrollable={false} />
						</div>
					</div>)
			}
		</>
	)
}

export default ProgramDetails

