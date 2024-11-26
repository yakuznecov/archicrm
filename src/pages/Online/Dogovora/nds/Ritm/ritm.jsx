import React from 'react';
import pdfData from './contract-ritm.pdf';
import { OnlineContract } from '@/components';

const Ritm = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='РИТМ'
			director='Копосовой Анны Владимировны'
			url='https://archicrm.ru/online/dogovora/ritm'
		/>
	);
};

export default Ritm;
