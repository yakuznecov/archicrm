import React from 'react';
import pdfData from './contract-prioritet.pdf';
import { OnlineContract } from '@/components';

const Prioritet = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Приоритет'
			director='Леон Полины Валерьевны'
			url='https://archicrm.ru/online/dogovora/prioritet'
		/>
	);
};

export default Prioritet;
