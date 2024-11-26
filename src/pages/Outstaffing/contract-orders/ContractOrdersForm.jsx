import React from 'react';
import { Form, Input, Divider, Button, Typography } from 'antd';
import { CustomRadio } from '@/components';
const { Text } = Typography;

const ContractOrdersForm = ({
	onFinish,
	form,
	companyName,
	companyBalance,
	totalPaymentAmount,
	paymentType,
	handlePaymentTypeChange,
	paymentTypeOptions,
	loadingBtn,
}) => {
	return (
		<Form onFinish={onFinish} autoComplete='off' form={form}>
			<Divider style={{ margin: '8px 0' }} />
			{/* <div className='mb-1'>
				<label className='form-label archi-label '>
					<Text>{companyName}</Text>
				</label>
			</div> */}
			{/* <div className='mb-1'>
				<label className='form-label archi-label'>
					Баланс нал: <Text type='danger'>{companyBalance?.balance_cash}</Text>
				</label>
			</div> */}
			{/* <div>
				<label className='form-label archi-label'>
					Баланс безнал:{' '}
					<Text type='danger'>{companyBalance?.balance_transfer}</Text>
				</label>
			</div> */}
			{/* <Divider style={{ margin: '8px 0' }} /> */}
			<div className='mb-2'>
				<label className='form-label archi-label'>
					Общая сумма оплаты - <Text type='danger'>{totalPaymentAmount}</Text>
				</label>
			</div>
			<Form.Item
				name='amount'
				rules={[
					{
						required: true,
						message: 'Введите сумму',
					},
					{
						validator: (_, value) => {
							if (value && Number(value) > totalPaymentAmount) {
								return Promise.reject(
									new Error('Сумма превышает общую сумму оплаты')
								);
							}

							return Promise.resolve();
						},
					},
				]}
				validateTrigger={['onBlur', 'onChange', 'onFocus']}
			>
				<Input type='number' />
			</Form.Item>
			<div className='d-flex justify-content-between'>
				{/* Нал или безнал */}
				{/* <CustomRadio
					value={paymentType}
					onChange={handlePaymentTypeChange}
					options={paymentTypeOptions}
					defaultValue={paymentType}
				/> */}
				<Form.Item noStyle={true}>
					<Button type='primary' htmlType='submit' loading={loadingBtn}>
						Оплатить
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
};

export default ContractOrdersForm;
