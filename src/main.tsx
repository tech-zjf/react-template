import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router/dom';
import { routers } from '@/router';
import '@/lib/rem';
import useGlobalStore, { type BeforeInstallPromptEvent } from './store/global';

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    useGlobalStore.getState().setDeferredPrompt(event as BeforeInstallPromptEvent);
});

createRoot(document.getElementById('root')!).render(<RouterProvider router={routers} />);
