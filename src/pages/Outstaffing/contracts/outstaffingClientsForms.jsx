//OutstaffingClientsForms  Формы клиента аутов при заполнении договора
import { Col, Row } from 'antd';
import ClientTabForm from './components/ClientTabForm';
import { CommonSelect } from '@/components';
import SelectProcuratory from '../selectProcuratory';
import SelectCompany from '../selectCompany';
import useLoadClientData from './hooks/useLoadClientData';

const OutstaffingClientsForms = ({ form }) => {
	const {
		isEdit, // договор на редактировании
		fields,
		onFinish,
		contractById,
		contrAgentsItems,
		selectedContrAgent,
		contrAgentsLoading,
		handleContrAgentChange,
	} = useLoadClientData();

	return (
		<>
			<Row className='mb-3 align-items-center' gutter={16}>
				<Col span={16}>
					{/* Выбор контрагента */}
					<label className='form-label archi-label'>
						Контрагент (внешняя компания или физик)
					</label>
					<CommonSelect
						value={selectedContrAgent}
						options={contrAgentsItems}
						onChange={handleContrAgentChange}
						placeholder='Выбрать контрагента'
						loading={contrAgentsLoading}
					/>
				</Col>
			</Row>
			<Row className='mb-3' gutter={16}>
				<Col span={10}>
					{/* Выбор компании */}
					<SelectCompany company={contractById?.client?.company?.id} />
				</Col>
				<Col span={14}>
					{/* Выбор доверенности */}
					<SelectProcuratory />
				</Col>
			</Row>

			<ClientTabForm
				fields={fields}
				onFinish={onFinish}
				form={form}
				isEdit={isEdit}
			/>
		</>
	);
};

export default OutstaffingClientsForms;
