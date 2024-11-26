// Таблица окончания рабочего времени аутстафф
import { Card, Modal } from 'antd';
import { useLoadWorkingPeriod } from '../hooks/useLoadWorkingPeriod';
import EndTimeForm from './EndTimeForm';
import { CommonTable } from '@/components';

const EndTimeOutstaffTable = () => {
	// Логика загрузки рабочего времени
	const {
		loading,
		workingPeriodList,
		columns,
		modal,
		cancelFormFields,
		form,
		fields,
		onFinish,
		staffName,
		loadingById,
	} = useLoadWorkingPeriod();

	return (
		<>
			<Card title='Период работы сотрудников'>
				<CommonTable
					columns={columns}
					data={workingPeriodList}
					loading={loading}
					bordered
				/>
			</Card>

			<Modal
				open={modal}
				title='Изменить данные'
				onCancel={cancelFormFields}
				footer={null}
			>
				<EndTimeForm
					fields={fields}
					onFinish={onFinish}
					form={form}
					staffName={staffName}
					loading={loadingById}
				/>
			</Modal>
		</>
	);
};

export default EndTimeOutstaffTable;
