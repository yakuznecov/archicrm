import React from 'react';
import pdfData from './contract-vektor.pdf';
import { OnlineContract } from '@/components';

const Vektor = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Вектор'
			director='Леон Полины Валерьевны'
			url='https://archicrm.ru/online/dogovora/vektor'
		/>
	);
};

export default Vektor;
