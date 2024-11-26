// Список компаний
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { Col, Row, Modal, Table, Card, Form, Input, Button } from 'antd';

import { useToggle } from '@/hooks';
import Breadcrumbs from '@/components/Common/Breadcrumb';
import { Toaster } from 'react-hot-toast'; // notifications
import { CompanyAddressRadio } from '@/components';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCompanyAddress } from '@/storeZustand';

import Loader from '@/components/Common/Loader';
import EditIcon from '@/components/Common/Icons/EditIcon';
import StarIcon from '@/components/Common/Icons/StarIcon';

const CompanyAddress = () => {
	// Modal edit and add customer
	const [modal, toggleModal] = useToggle(false);
	const [isEdit, setIsEdit] = useState(false);
	const [selectedType, setSelectedType] = useState('Фактический Адрес');

	// Все адреса компаний
	const [
		companyAddress,
		singleCompanyAddress,
		loading,
		getCompanyAddress,
		addCompanyAddress,
		getCompanyAddressById,
		updateCompanyAddress,
	] = useCompanyAddress(
		useShallow((state) => [
			state.companyAddress,
			state.singleCompanyAddress,
			state.loading,
			state.getCompanyAddress,
			state.addCompanyAddress,
			state.getCompanyAddressById,
			state.updateCompanyAddress,
		])
	);

	// получить список адресов компаний
	useEffect(() => {
		getCompanyAddress();
	}, []);

	// установка выбранного типа адреса при редактировании
	useEffect(() => {
		if (singleCompanyAddress.type) {
			setSelectedType(singleCompanyAddress.type);
		}
	}, [singleCompanyAddress]);

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const id = isEdit ? singleCompanyAddress.id : undefined;

		const addressData = {
			name: values.address,
			type: selectedType,
		};

		toggleModal();

		if (isEdit) {
			await updateCompanyAddress({ id, addressData });
		} else {
			await addCompanyAddress(addressData);
		}

		getCompanyAddress();
	};

	// Добавить адрес
	const handleAddressAdd = () => {
		setIsEdit(false);
		toggleModal();
	};

	// получить конкретный адрес
	const handleCellClick = useCallback((id) => {
		getCompanyAddressById(id);
		setIsEdit(true);
		toggleModal();
	}, []);

	// выбор типа адреса
	const handleOptionChange = (event) => {
		setSelectedType(event.target.value);
	};

	// срабатывает при закрытии модалки
	const cancelFormFields = () => {
		toggleModal();
		form.resetFields();
	};

	const columns = useMemo(
		() => [
			{
				title: 'Адрес',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Тип адреса',
				dataIndex: 'type',
				key: 'type',
			},
			{
				title: 'Действия',
				key: 'action',
				render: (text) => {
					const { id } = text;
					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='list-inline font-size-20 contact-links mb-0'>
								{/* edit address */}
								<li
									className='list-inline-item text-primary cursor-pointer'
									onClick={() => {
										handleCellClick(id);
									}}
								>
									<EditIcon id={`edittooltip-${id}`} />
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleCellClick]
	);

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs
					title='Список адресов компаний'
					breadcrumbItem='Список адресов компаний'
					addButtonLabel='Создать адрес компании'
					onClick={handleAddressAdd}
				/>
				<Row>
					<Col span={24}>
						<Card>
							{loading && <Loader />}
							{!loading && companyAddress && companyAddress?.length > 0 && (
								<Table
									columns={columns}
									dataSource={companyAddress}
									pagination={false}
									size='small'
								/>
							)}
						</Card>
					</Col>
				</Row>

				<Modal
					open={modal}
					width={600}
					footer={null}
					onCancel={cancelFormFields}
					title={
						!!isEdit ? 'Изменить адрес компании' : 'Создать адрес компании'
					}
				>
					<Form
						fields={[
							{
								name: ['address'],
								value: singleCompanyAddress?.name,
							},
						]}
						onFinish={onFinish}
						autoComplete='off'
						form={form}
					>
						<Row className='mb-4'>
							<Col span={24}>
								<label className='form-label archi-label'>Адрес компании</label>
								<StarIcon />
								<Form.Item
									name='address'
									rules={[
										{
											required: true,
											message: 'Введите адрес!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>

						{/* Выбор типа адреса компании */}
						<CompanyAddressRadio
							selectedType={selectedType}
							handleOptionChange={handleOptionChange}
						/>

						<Row className='justify-content-end'>
							<div className='text-end'>
								<Form.Item noStyle={true}>
									<Button type='primary' htmlType='submit'>
										{isEdit ? 'Обновить адрес' : 'Сохранить адрес'}
									</Button>
								</Form.Item>
							</div>
						</Row>
					</Form>
				</Modal>
			</div>

			<Toaster position='top-right' reverseOrder={true} />
		</div>
	);
};

export default CompanyAddress;
