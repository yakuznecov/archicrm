import React from 'react';
import pdfData from './contract-leon.pdf';
import { OnlineContract } from '@/components';

const Leon = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			director='Леон Полины Валерьевны'
			url='https://archicrm.ru/online/dogovora/ipleon'
			ip
		/>
	);
};

export default Leon;
