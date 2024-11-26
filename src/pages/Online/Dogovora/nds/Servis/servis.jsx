import React from 'react';
import pdfData from './contract-servis.pdf';
import { OnlineContract } from '@/components';

const Servis = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Сервис'
			director='Копосовой Анны Владимировны'
			url='https://archicrm.ru/online/dogovora/servis'
		/>
	);
};

export default Servis;
