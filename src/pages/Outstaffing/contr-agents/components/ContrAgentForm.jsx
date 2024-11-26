// формы в модальном окне контрагентов
import { Form, Row, Col, Input, Button, Flex } from 'antd';
import ContrAgentStatusRadio from './ContrAgentStatusRadio';
import { CommonSelect } from '@/components';

const ContrAgentForm = ({
	onFinish,
	statusType,
	handleStatusChange,
	loadingBtn,
	selectedExternalCompany,
	externalCompaniesList,
	handleExternalCompanyChange,
}) => {
	return (
		<div>
			<div className='mb-3'>
				<label className='form-label archi-label'>Статус</label>
				<ContrAgentStatusRadio
					statusType={statusType}
					handleStatusChange={handleStatusChange}
				/>
			</div>

			<div className='mb-3'>
				<label className='form-label archi-label'>Компании</label>
				<CommonSelect
					value={selectedExternalCompany}
					options={externalCompaniesList}
					onChange={handleExternalCompanyChange}
					placeholder='Выбрать внешнюю компанию'
				/>
			</div>

			<Flex justify='end' className='mt-3'>
				<Button
					type='primary'
					htmlType='submit'
					loading={loadingBtn}
					onClick={onFinish}
				>
					Сохранить
				</Button>
			</Flex>
		</div>
	);
};

export default ContrAgentForm;
