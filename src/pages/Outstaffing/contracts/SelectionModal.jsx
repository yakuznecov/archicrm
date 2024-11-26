// модальное окно смены статуса договора на увольнение или работу
import React, { useState } from 'react';
import { Modal, Form, Button, Typography } from 'antd';
import { CustomRadio } from '@/components';
import { patchContract } from '@/services';

const contractTypeOptions = [
	{ value: false, label: 'Работает' },
	{ value: true, label: 'Увольнение' },
];

const SelectionModal = ({
	open,
	toggleModal,
	totalSelected,
	setSelectedRowKeys,
	selectedRows,
}) => {
	const [form] = Form.useForm();
	const { Text } = Typography;
	// тип договора, увольнение или работа
	const [contractType, setContractType] = useState(false);
	const [loadingBtn, setLoadingBtn] = useState(false);

	const onFinish = (values) => {
		setLoadingBtn(true);

		for (const row of selectedRows) {
			const data = {
				on_fire: contractType,
			};

			patchContract({ id: row.id, updatedContract: data });
		}

		console.log(values);

		setTimeout(() => {
			setSelectedRowKeys([]);
			setLoadingBtn(false);
			// getContractOrders();
			toggleModal();
		}, 1000);
	};

	// Работает или увольнение
	const handleContractTypeChange = (event) => {
		const value = event.target.value;
		setContractType(value);
	};

	return (
		<Modal
			title='Изменить статус договоров'
			open={open}
			onCancel={toggleModal}
			width={400}
			footer={null}
		>
			<Form onFinish={onFinish} autoComplete='off' form={form}>
				<div className='mb-2'>
					<label className='form-label archi-label'>
						Количество выбранных договоров -{' '}
						<Text type='danger'>{totalSelected}</Text>
					</label>
				</div>
				<div className='d-flex justify-content-between'>
					{/* Уволен или работает */}
					<CustomRadio
						value={contractType}
						onChange={handleContractTypeChange}
						options={contractTypeOptions}
						defaultValue={contractType}
					/>
					<Form.Item noStyle={true}>
						<Button type='primary' htmlType='submit' loading={loadingBtn}>
							Сохранить
						</Button>
					</Form.Item>
				</div>
			</Form>
		</Modal>
	);
};

export default SelectionModal;
