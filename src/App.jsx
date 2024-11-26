import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './helpers/query-client';

// Import Routes all
import { userRoutes, authRoutes, contactsRoutes } from './routes/allRoutes';

// Import all middleware
import Authmiddleware from './routes/middleware/Authmiddleware';

// layouts Format
import VerticalLayout from './components/VerticalLayout/';
import NonAuthLayout from './components/NonAuthLayout';

const App = () => {
	const Layout = VerticalLayout;

	return (
		<QueryClientProvider client={queryClient}>
			<React.Fragment>
				<Routes>
					{authRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={<NonAuthLayout>{route.component}</NonAuthLayout>}
							key={idx}
							isAuthProtected={false}
						/>
					))}

					{userRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={
								<Authmiddleware>
									<Layout>{route.component}</Layout>
								</Authmiddleware>
							}
							key={idx}
							isAuthProtected={true}
							exact
						/>
					))}

					{contactsRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={route.component}
							key={idx}
							isAuthProtected={true}
							exact
						/>
					))}
				</Routes>
			</React.Fragment>
		</QueryClientProvider>
	);
};

export default App;
