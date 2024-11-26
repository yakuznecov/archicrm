// AddSubVisit, добавление визита за абонемент

import { post } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const addSubVisit = async (subId) => {
	try {
		const visitDate = new Date().toISOString();
		const convertDate = visitDate.split('T')[0];

		const newVisit = {
			visit_date: convertDate,
			subscription: subId,
		};

		await post('/visit/subscription/', newVisit);

		successToast('Визит за абонемент списан.');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении визита за абонемент.');
	}
};

export default addSubVisit;
