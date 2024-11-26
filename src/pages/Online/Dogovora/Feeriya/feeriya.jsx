import React from 'react';
import pdfData from './contract-feeriya.pdf';
import { OnlineContract } from '@/components';

const Feeriya = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Феерия'
			director='Ушакова Павла Валерьевича'
			url='https://archicrm.ru/online/dogovora/feeriya'
		/>
	);
};

export default Feeriya;
