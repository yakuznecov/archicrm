import React from 'react';
import pdfData from './contract-ipzhiuris.pdf';
import { OnlineContract } from '@/components';

const IpZhiuris = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			director='Жиуриса Артура Витовича'
			url='https://archicrm.ru/online/dogovora/ipzhiuris'
			ip
		/>
	);
};

export default IpZhiuris;
