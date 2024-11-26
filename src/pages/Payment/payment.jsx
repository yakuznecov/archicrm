// Payment page
import { Card } from 'antd';
import { PaymentTable } from '@/components';

const Payment = () => {
	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Card>
					<PaymentTable />
				</Card>
			</div>
		</div>
	);
};

export default Payment;
