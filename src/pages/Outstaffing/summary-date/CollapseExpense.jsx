// Аккордион с таблицей расходов
import { Collapse, ConfigProvider } from 'antd';
import CashTableOutstaff from './CashTableOutstaff';

const CollapseExpense = ({ modal, toggleModal }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Collapse: {
						headerBg: 'rgba(93, 182, 216, 0.4)',
						algorithm: true,
					},
				},
			}}
		>
			<Collapse
				size="small"
				defaultActiveKey={['1']}
				items={[
					{
						key: '1',
						label: 'Расходные операции',
						children: <CashTableOutstaff modal={modal} toggleModal={toggleModal} />,
					},
				]}
			/>
		</ConfigProvider>
	);
};

export default CollapseExpense;
