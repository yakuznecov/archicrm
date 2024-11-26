// физики
import { Modal, Table, Flex, Card } from 'antd';
import Loader from '@/components/Common/Loader';
import useLoadPhysics from './hooks/useLoadPhysics';
import { PrimaryBtn } from '@/components';
import PhysicForm from './PhysicForm';

const Physics = () => {
	// Логика загрузки физиков
	const {
		modal,
		fields,
		isEdit,
		columns,
		loading,
		loadingBtn,
		toggleModal,
		physicsList,
		onFinish,
		handleAddPhysic,
	} = useLoadPhysics();

	return (
		<>
			<Flex className='mb-3'>
				<PrimaryBtn onClick={handleAddPhysic}>Создать физика</PrimaryBtn>
			</Flex>
			<Card>
				{loading && <Loader />}
				{!loading && physicsList && physicsList?.length > 0 && (
					<Table
						columns={columns}
						dataSource={physicsList}
						size='small'
						rowKey='id'
					/>
				)}
			</Card>

			<Modal
				title={isEdit ? 'Редактирование физика' : 'Добавление физика'}
				open={modal}
				onCancel={toggleModal}
				width={600}
				footer={null}
			>
				<PhysicForm
					onFinish={onFinish}
					isEdit={isEdit}
					loadingBtn={loadingBtn}
					fields={fields}
				/>
			</Modal>
		</>
	);
};

export default Physics;
