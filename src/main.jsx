import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import './scss/theme.scss';
import ErrorFallback from './components/Common/ErrorFallback/ErrorFallback.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => window.location.replace('/')}
			>
				<App />
			</ErrorBoundary>
		</BrowserRouter>
	</StrictMode>
);
