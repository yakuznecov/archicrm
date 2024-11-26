// формы внутри модального окна депозитов
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useFetchOwnCompanies } from '@/hooks';
import { CommonSelect } from '@/components';

const DepositForm = ({
	isEdit,
	onFinish,
	loadingBtn,
	isBuh,
	selectedContrAgent,
	selectedOwnCompany,
	handleOwnCompanyChange,
	contrAgentsItems,
	handleContrAgentChange,
	isCheckedNds,
	onChangeNds,
	selectedContrAgentDeposit,
	loading,
}) => {
	const [form] = Form.useForm();

	const [amount, setAmount] = useState(0); // состояние для хранения суммы

	// Список собственных компаний
	const { ownCompaniesList } = useFetchOwnCompanies();

	useEffect(() => {
		if (selectedContrAgentDeposit) {
			setAmount(selectedContrAgentDeposit?.amount);
		}
	}, [selectedContrAgentDeposit]);

	useEffect(() => {
		if (!selectedOwnCompany) {
			form.resetFields(); // очистка полей с суммой
		}
	}, [selectedOwnCompany]);

	const onAmountChange = (e) => {
		const value = parseFloat(e.target.value) || 0;
		setAmount(value);
	};

	const baseAmount = isCheckedNds
		? (amount / 1.2)?.toFixed(2)
		: amount?.toFixed(2) || 0;
	// Сумма НДС
	const ndsAmount = isCheckedNds ? (amount - baseAmount)?.toFixed(2) : 0;

	return (
		<Form
			onFinish={onFinish}
			autoComplete='off'
			form={form}
			fields={[
				{
					name: 'amount',
					value: amount,
				},
				{
					name: 'amount_nds',
					value: ndsAmount,
				},
				{
					name: 'amount_no_nds',
					value: baseAmount,
				},
			]}
		>
			<div className='mb-3'>
				<label className='form-label archi-label'>Собственная компания</label>
				{/* Выбор внутренней компании */}
				<CommonSelect
					value={selectedOwnCompany}
					options={ownCompaniesList}
					onChange={handleOwnCompanyChange}
					placeholder='Выбрать компанию'
				/>
			</div>
			<div className='mb-3'>
				<label className='form-label archi-label'>Контрагент</label>
				{/* Выбор контрагента */}
				<CommonSelect
					value={selectedContrAgent}
					options={contrAgentsItems}
					onChange={handleContrAgentChange}
					placeholder='Выбрать контрагента'
					loading={loading}
				/>
			</div>
			<div className='mb-3 d-flex gap-3 align-items-center'>
				<Checkbox checked={isCheckedNds} onChange={onChangeNds}>
					НДС
				</Checkbox>
			</div>
			<div className='d-flex gap-3'>
				<Form.Item
					name='amount'
					style={{ width: '100px' }}
					rules={[
						{
							required: true,
							message: 'Введите сумму',
						},
					]}
				>
					<Input
						type='number'
						placeholder={isBuh ? 'Безнал' : 'Наличные'}
						onChange={onAmountChange}
					/>
				</Form.Item>
				<Form.Item noStyle={true}>
					<Button type='primary' htmlType='submit' loading={loadingBtn}>
						{isEdit ? 'Обновить депозит' : 'Добавить депозит'}
					</Button>
				</Form.Item>
			</div>
			<Row gutter={16}>
				{isCheckedNds && (
					<Col span={8}>
						<label className='form-label archi-label'>НДС 20%</label>
						<Form.Item name='amount_nds'>
							<Input type='number' readOnly />
						</Form.Item>
					</Col>
				)}

				<Col span={8}>
					<label className='form-label archi-label'>Итого</label>
					<Form.Item name='amount_no_nds'>
						<Input type='number' readOnly />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default DepositForm;
