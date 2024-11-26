// Статистика
import Deposits from './deposits';
import Managers from './managers';
import Companies from './companies';
import Contracts from './contracts';
import OutstaffCash from './outstaffCash';
import OrdersPayments from './ordersPayments';
import OrdersNotPayments from './ordersNotPayments';

const SummaryDate = () => {
	return (
		<>
			{/* Касса наличные департамента, расход */}
			<OutstaffCash />
			<Contracts />
			<Managers />
			<Companies />
			{/* <Deposits /> */}
			<OrdersNotPayments />
			<OrdersPayments />
		</>
	);
}

export default SummaryDate;