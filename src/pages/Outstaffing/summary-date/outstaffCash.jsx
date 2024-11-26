// Общая касса аутстафф наличные
import { useToggle } from '@/hooks';
import { Card, Row, Col, Statistic } from 'antd';
import { PrimaryBtn } from '@/components';
import useBalanceDepartment from './hooks/useBalanceDepartment';
import { WalletTwoTone } from '@ant-design/icons';
import CollapseExpense from './CollapseExpense';

const OutstaffCash = () => {
	const [modal, toggleModal] = useToggle(false);

	// логика загрузки баланса департамента
	const { outstaffCashierByDepartment, loadingBalance } =
		useBalanceDepartment();

	// Добавить приход/расход
	const handleCashAdd = () => {
		toggleModal();
	};

	return (
		<Card className='mb-3'>
			<Row gutter={8}>
				<div style={{ width: '190px' }}>
					<Statistic
						title='Баланс департамента'
						value={outstaffCashierByDepartment}
						prefix={<WalletTwoTone />}
						valueStyle={{ color: '#ee7269', fontWeight: 'bold' }}
						loading={loadingBalance}
					/>
				</div>
				<Col span={14}>
					<CollapseExpense modal={modal} toggleModal={toggleModal} />
				</Col>
				<PrimaryBtn onClick={handleCashAdd}>Создать расход</PrimaryBtn>
			</Row>
		</Card>
	);
};

export default OutstaffCash;
