import React from 'react';
import pdfData from './contract-atlant.pdf';
import { OnlineContract } from '@/components';

const Atlant = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Атлант'
			director='Леон Полины Валерьевны'
			url='https://archicrm.ru/online/dogovora/atlant'
		/>
	);
};

export default Atlant;
