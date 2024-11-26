// Таблица с данными по кассе и расходом
import React from 'react';
import { Col, Row, Modal, Form, Input, Button } from 'antd';
import { Toaster } from 'react-hot-toast'; // notifications
import { CommonTable } from '@/components';
import { formatIsoTimeToString } from '@/helpers/Date/formatDate';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useUserStore, useDepartmentsStore } from '@/storeZustand';
import { postOutstaffCashier } from '@/services';
import { useOutstaffCashierColumns, useLoadOutstaffCashier } from '@/hooks';

const CashTableOutstaff = ({ modal, toggleModal }) => {
	const { TextArea } = Input;

	// выбранный тип radio, приход или расход
	// const [selectedType, setSelectedType] = useState(1);

	// Колонки для таблицы расходов
	const columns = useOutstaffCashierColumns();

	// Загрузка id сотрудника
	const [staffId] = useUserStore(useShallow((state) => [state.staffId]));

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	const { outstaffCashierList, getOutstaffCashier, loading } =
		useLoadOutstaffCashier(); // логика загрузка кассы

	// Добавление расхода
	const onFinish = async (values) => {
		// если приход, то оплата сразу, иначе подтверждение
		// const cashierStatus = Number(selectedType) === 1 ? 'Одобрено' : 'В процессе';

		const newCashier = {
			amount: values.amount,
			date_of_payment: formatIsoTimeToString(new Date()),
			status: 'В процессе',
			description: values.description,
			department: selectedDepartment,
			creator: staffId,
		};

		toggleModal();

		await postOutstaffCashier(newCashier);
		await getOutstaffCashier();
	};

	// const handleOptionChange = (event) => {
	// 	setSelectedType(event.target.value);
	// };

	const cancelFormFields = () => {
		toggleModal();
	};

	return (
		<>
			{outstaffCashierList && outstaffCashierList?.length > 0 && (
				<CommonTable
					columns={columns}
					data={outstaffCashierList}
					loading={loading}
				/>
			)}

			<Modal
				open={modal}
				title='Создать расход'
				width={260}
				footer={null}
				onCancel={cancelFormFields}
			>
				<Form onFinish={onFinish} autoComplete='off'>
					<Row>
						<Col span={24}>
							<div className='mb-3 '>
								<label className='form-label archi-label'>Сумма</label>
								<Form.Item
									name='amount'
									rules={[
										{
											required: true,
											message: 'Введите сумму!',
										},
									]}
								>
									<Input
										onInput={(e) =>
											(e.target.value = e.target.value.replace(/-/g, ''))
										}
									/>
								</Form.Item>
							</div>
							{/* <div className="mb-3">
								<Radio.Group size="large" onChange={handleOptionChange} value={selectedType}>
									<Radio value={1}>Приход</Radio>
									<Radio value={2}>Расход</Radio>
								</Radio.Group>
							</div> */}
							<div className='mb-3'>
								<label className='form-label archi-label'>Комментарий</label>
								<Form.Item
									name='description'
									rules={[
										{
											required: true,
											message: 'Введите сумму!',
										},
									]}
								>
									<TextArea
										placeholder='Введите комментарий'
										autoSize={{
											minRows: 2,
											maxRows: 6,
										}}
									/>
								</Form.Item>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className='text-end'>
								<Form.Item noStyle={true}>
									<Button type='primary' htmlType='submit'>
										Сохранить
									</Button>
								</Form.Item>
							</div>
						</Col>
					</Row>
				</Form>
			</Modal>
			<div>
				<Toaster position='top-right' reverseOrder={true} />
			</div>
		</>
	);
};

export default CashTableOutstaff;
