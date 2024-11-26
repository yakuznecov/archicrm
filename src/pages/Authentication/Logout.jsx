// logout

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import withRouter from '@/components/Common/withRouter';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/storeZustand';

const Logout = () => {
	// Auth store
	const [logout] = useAuthStore(useShallow((state) => [state.logout]));

	const history = useNavigate();

	useEffect(() => {
		logout(history);
	}, [history, logout]);

	return <></>;
};

export default withRouter(Logout);
