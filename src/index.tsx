import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app';
import './styles.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
