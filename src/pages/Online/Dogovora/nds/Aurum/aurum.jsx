import React from 'react';
import pdfData from './contract-aurum.pdf';
import { OnlineContract } from '@/components';

const Aurum = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Аурум'
			director='Ушакова Павла Валерьевича'
			url='https://archicrm.ru/online/dogovora/aurum'
		/>
	);
};

export default Aurum;
