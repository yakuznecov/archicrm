import React from 'react';
import pdfData from './contract-liberty.pdf';
import { OnlineContract } from '@/components';

const Liberty = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Либерти'
			director='Ушакова Павла Валерьевича'
			url='https://archicrm.ru/online/dogovora/liberty'
		/>
	);
};

export default Liberty;
