import React from 'react';
import pdfData from './contract-grand.pdf';
import { OnlineContract } from '@/components';

const Grand = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='ГРАНД'
			director='Ушакова Павла Валерьевича'
			url='https://archicrm.ru/online/dogovora/grand'
		/>
	);
};

export default Grand;
