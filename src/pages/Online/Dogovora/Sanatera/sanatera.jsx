import React from 'react';
import pdfData from './sanatera.pdf';
import { OnlineContract } from '@/components';

const Sanatera = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Санатера'
			director='Сукорского Владимира Сергеевича'
			url='https://archicrm.ru/online/dogovora/sanatera'
		/>
	);
};

export default Sanatera;
