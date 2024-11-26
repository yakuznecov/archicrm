import React from 'react';
import pdfData from './contract-arkona.pdf';
import { OnlineContract } from '@/components';

const Arkona = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Аркона'
			director='Копосовой Анны Владимировны'
			url='https://archicrm.ru/online/dogovora/arkona'
		/>
	);
};

export default Arkona;
