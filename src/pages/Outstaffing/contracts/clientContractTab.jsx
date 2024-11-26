// ClientContractTab

import { Col, Row, Select, Input, Form, Button } from 'antd';
import { ArchiSpinner, CommonSelect } from '@/components';
import StarIcon from '@/components/Common/Icons/StarIcon';
import AccordionContract from './accordionContract';
import { filterOption } from '@/helpers';
import { useLoadClientContract } from './hooks/useLoadClientContract';
import { ReferalBtn } from './ReferalBtn';

const ClientContractTab = () => {
	const {
		form,
		isEdit,
		fields,
		contractById,
		loadingSingle,
		selectedManager,
		setSelectedManager,
		outstaffManagerList,
		contractServicesList,
		additionalServicesList,
		handleServiceChange,
		handleAdditionalServiceChange,
		selectedContractService,
		selectedAdditionalService,
		onFinish,
	} = useLoadClientContract();

	return (
		<div>
			{loadingSingle && <ArchiSpinner />}
			<Form fields={fields} onFinish={onFinish} autoComplete='off' form={form}>
				<Row className='mb-3' gutter={16}>
					{/* Номер договора */}
					<Col span={6}>
						<label className='form-label archi-label me-1'>№ договора</label>
						<StarIcon />
						<Form.Item
							name='contract_number'
							rules={[
								{
									required: true,
									message: 'Введите номер договора!',
								},
							]}
						>
							<Input autoComplete='on' />
						</Form.Item>
					</Col>
					{/* Дата начала договора */}
					<Col span={6}>
						<label className='form-label me-1'>Дата начала договора</label>
						<StarIcon />
						<Form.Item
							name='contract_date'
							rules={[
								{
									required: true,
									message: 'Введите дату договора!',
								},
							]}
						>
							<Input type='date' min='1900-01-01' max='2100-01-01' />
						</Form.Item>
					</Col>
					{/* Дата уведомления */}
					<Col span={6}>
						<label className='form-label'>Дата уведомления</label>
						<Form.Item name='notification_date'>
							<Input type='date' min='1900-01-01' max='2100-01-01' />
						</Form.Item>
					</Col>
					{/* Дата увольнения */}
					<Col span={6}>
						<label className='form-label'>Дата увольнения</label>
						<Form.Item name='order_fire_date'>
							<Input type='date' min='1900-01-01' max='2100-01-01' />
						</Form.Item>
					</Col>
				</Row>
				<Row className='mb-3' gutter={8}>
					{/* Выбор Менеджера */}
					<Col span={7}>
						<label className='form-label archi-label me-1'>Менеджер</label>
						<StarIcon />
						{/* Выбор менеджера */}
						<CommonSelect
							value={selectedManager}
							options={outstaffManagerList}
							onChange={setSelectedManager}
							placeholder='Выбрать менеджера'
							status={selectedManager ? 'success' : 'error'}
						/>
					</Col>
					<Col span={6}>
						<label className='form-label archi-label me-1'>Услуги</label>
						{/* Выбор услуги */}
						<Select
							allowClear
							placeholder='Выбрать'
							style={{ width: '100%' }}
							value={selectedContractService || undefined}
							onChange={handleServiceChange}
							options={contractServicesList}
							filterOption={filterOption}
							optionFilterProp='children'
							status={selectedContractService ? 'success' : 'error'}
						/>
					</Col>
					<Col span={7}>
						<label className='form-label archi-label me-1'>Доп. услуги</label>
						{/* Выбор услуги */}
						<Select
							allowClear
							mode='multiple'
							placeholder='Выбрать'
							style={{ width: '100%' }}
							value={selectedAdditionalService || undefined}
							onChange={handleAdditionalServiceChange}
							options={additionalServicesList}
							filterOption={filterOption}
							optionFilterProp='children'
						/>
					</Col>
				</Row>

				{/* Реферальная ссылка */}
				<ReferalBtn />

				{/* Аккордионы договора */}
				<AccordionContract />

				<div className='text-end'>
					<Form.Item noStyle={true}>
						<Button type='primary' htmlType='submit'>
							{isEdit && contractById?.contract_number
								? 'Обновить договор'
								: 'Создать договор'}
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};

export default ClientContractTab;
