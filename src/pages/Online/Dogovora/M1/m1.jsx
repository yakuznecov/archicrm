import React from 'react';
import pdfData from './contract-m1.pdf';
import { OnlineContract } from '@/components';

const M1 = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='M1'
			director='Сукорского Владимира Сергеевича'
			url='https://archicrm.ru/online/dogovora/m1'
		/>
	);
};

export default M1;
