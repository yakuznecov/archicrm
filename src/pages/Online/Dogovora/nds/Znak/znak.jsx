import React from 'react';
import pdfData from './contract-znak.pdf';
import { OnlineContract } from '@/components';

const Znak = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Знак'
			director='Копосовой Анны Владимировны'
			url='https://archicrm.ru/online/dogovora/znak'
		/>
	);
};

export default Znak;
