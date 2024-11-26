// Таблица начала рабочего времени аутстафф
import { Card, Modal } from 'antd';
import { useLoadOutstaffWorkers } from '../hooks/useLoadOutstaffWorkers';
import StartTimeForm from './StartTimeForm';
import { CommonTable } from '@/components';

const StartTimeOutstaffTable = () => {
	// Логика загрузки сотрудников
	const {
		columns,
		modalStaff,
		fields,
		form,
		cancelFormFields,
		onFinish,
		isTimeAdded,
		isSuperUser,
		loading,
		roleMappings,
		isPending,
	} = useLoadOutstaffWorkers();

	return (
		<>
			{roleMappings.map(
				({ role, title, data }) =>
					(isSuperUser || role) && (
						<Card title={title} className='mb-2' key={title}>
							<CommonTable
								columns={columns}
								data={data}
								loading={isPending}
								bordered
							/>
						</Card>
					)
			)}

			<Modal
				title='Установить время начала работы'
				open={modalStaff}
				onCancel={cancelFormFields}
				width={540}
				footer={null}
			>
				<StartTimeForm
					fields={fields}
					onFinish={onFinish}
					form={form}
					isTimeAdded={isTimeAdded}
				/>
			</Modal>
		</>
	);
};

export default StartTimeOutstaffTable;
