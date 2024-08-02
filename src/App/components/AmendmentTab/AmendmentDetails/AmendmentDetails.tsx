import React, { useState } from 'react';
import { AmendmentDetailsData, DetailsProps, IInputData, InputDataCategory, InputDataString, ListColumnData } from '../../../shared/types';
import Scripts from '../../../shared/utils/clientScripts';
import CustomInput from '../../CustomInput/CustomInput';
import InputButton from '../../InputButton/InputButton';
import icons from '../../../shared/icons';
import CustomInputDate from '../../CustomInputDate/CustomInputDate';
import CustomSelect from '../../CustomSelect/CustomSelect';
import Loader from '../../Loader/Loader';

interface AmendmentRowData {
	'id': string,
	'contract': InputDataCategory
	'amendment': InputDataCategory,
	'conclusionDate': InputDataString,
	'amendmentType': InputDataCategory,
	'startDate': InputDataString,
	'endDate': InputDataString,
	'status': InputDataCategory,
}

class AmendmentDetailsProps implements DetailsProps {
	data: AmendmentRowData;
	values: AmendmentDetailsData;
	setValue: (name: string, value: any) => void
	setValues: (values: AmendmentDetailsData) => void
	columnsSettings: ListColumnData[];
	onClickRowHandler: () => any
	reloadData: () => void
}

/** Форма редактирования/просмотра плана страхования */
function AmendmentDetails(props: AmendmentDetailsProps) {
	const { data, values, setValue, setValues, columnsSettings, onClickRowHandler, reloadData } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);

	React.useLayoutEffect(() => {
		setIsLoading(true)
		// Получить полные данные по data.id 
		Scripts.getAmendmentFulldata(data.id).then(fullData => {
			setIsLoading(false)
			// Присвоить полные данные в состояние
			setValues(fullData as any)
		})
	}, [])

	/** Нажатие на кнопку сохранить */
	const onClickSave = async () => {
		await Scripts.saveAmendment(data.id, values);
		onClickRowHandler()
		reloadData()
	}

	/** Нажатие на кнопку сохранить */
	const onClickCancel = async () => {
		onClickRowHandler()
	}

	return (
		<>
			{
				isLoading
					? (<div className="custom-list-row amendment-details"><Loader /></div>)
					: (<div className="custom-list-row amendment-details" style={{ gridTemplateColumns: columnsSettings.map(setting => `minmax(0,${setting.fr}fr)`).join(" ") }}>
						<div>
							<CustomInput isViewMode={true} name='contract' inputHandler={setValue} values={values} />
						</div>
						<div>
							<CustomInput isViewMode={true} name='amendment' inputHandler={setValue} values={values} />
						</div>
						<div>
							<CustomInputDate isViewMode={false} name='conclusionDate' inputHandler={setValue} values={values} />
						</div>
						<div>
							<CustomSelect isViewMode={true} name='amendmentType' inputHandler={setValue} values={values} getDataHandler={async (): Promise<IInputData[]> => { return [new InputDataString("test")] }} />
						</div>
						<div>
							<CustomInputDate isViewMode={false} name='startDate' inputHandler={setValue} values={values} />
						</div>
						<div>
							<CustomInputDate isViewMode={false} name='endDate' inputHandler={setValue} values={values} />
						</div>
						<div className='amendment-details__actions-column'>
							<CustomSelect isViewMode={false} name='status' inputHandler={setValue} values={values} getDataHandler={Scripts.getStatuses} />

							<div className='amendment-details__button-wrapper'>
								<InputButton svg={icons.Apply} clickHandler={onClickSave} />
							</div>
							<div className='amendment-details__button-wrapper'>
								<InputButton svg={icons.Deny} clickHandler={onClickCancel} />
							</div>
						</div>
					</div>)
			}
		</>
	)
}

export default AmendmentDetails

