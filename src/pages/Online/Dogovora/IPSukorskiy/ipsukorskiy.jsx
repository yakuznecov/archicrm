import React from 'react';
import pdfData from './contract-sukorskiy.pdf';
import { OnlineContract } from '@/components';

const Sukorskiy = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			director='Сукорского Владимира Сергеевича'
			url='https://archicrm.ru/online/dogovora/ipsukorskiy'
			ip
		/>
	);
};

export default Sukorskiy;
