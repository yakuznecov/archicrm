import React from 'react';
import pdfData from './contract-sfera.pdf';
import { OnlineContract } from '@/components';

const Sfera = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Сфера'
			director='Ушакова Павла Валерьевича'
			url='https://archicrm.ru/online/dogovora/sfera'
		/>
	);
};

export default Sfera;
