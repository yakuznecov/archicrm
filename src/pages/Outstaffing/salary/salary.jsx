import { Card, Modal } from 'antd';
import BonusForms from './components/BonusForms';
import PenaltyForms from './components/PenaltyForms';
import { useLoadSalary } from './hooks/useLoadSalary';
import { CommonTable } from '@/components';
import RateForm from './components/RateForm';
import PercentForm from './components/PercentForm';
import PaidForm from './components/PaidForm';
import SalaryStatCard from './components/SalaryStatCard';

const Salary = () => {
	// Загрузка данных зарплаты
	const {
		userInfo,
		modalRate,
		bonusModal,
		isSuperUser,
		modalPercent,
		penaltyModal,
		onFinishPaid,
		onFinishRate,
		salaryMappings,
		onFinishPercent,
		modalSalaryPaid,
		toggleModalRate,
		toggleBonusModal,
		togglePenaltyModal,
		toggleModalPercent,
		toggleModalSalaryPaid,
	} = useLoadSalary();

	return (
		<>
			{salaryMappings.map(
				({ role, title, data, columns, loading }) =>
					(isSuperUser || role) && (
						<Card title={title} className='mb-2' key={title}>
							<CommonTable
								columns={columns}
								data={data}
								loading={loading}
								bordered
							/>
						</Card>
					)
			)}

			<SalaryStatCard />

			<Modal
				title='Премии'
				open={bonusModal}
				onCancel={toggleBonusModal}
				width={500}
				footer={null}
			>
				<BonusForms />
			</Modal>

			<Modal
				title='Штрафы'
				open={penaltyModal}
				onCancel={togglePenaltyModal}
				width={500}
				footer={null}
			>
				<PenaltyForms />
			</Modal>

			<Modal
				title='Ставка за час'
				open={modalRate}
				onCancel={toggleModalRate}
				width={300}
				footer={null}
			>
				<RateForm onFinishRate={onFinishRate} />
			</Modal>

			<Modal
				title='Личный процент'
				open={modalPercent}
				onCancel={toggleModalPercent}
				width={300}
				footer={null}
			>
				<PercentForm onFinishPercent={onFinishPercent} />
			</Modal>

			<Modal
				title='Выдача зарплаты'
				open={modalSalaryPaid}
				onCancel={toggleModalSalaryPaid}
				width={390}
				footer={null}
			>
				<PaidForm onFinish={onFinishPaid} userInfo={userInfo} />
			</Modal>
		</>
	);
};

export default Salary;
