import { createBrowserRouter } from 'react-router';
import App from '../App';
import LoginPage from '@/pages/login';
import HomePage from '@/pages/home';

export const routers = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/test1',
                element: <div>test1</div>,
            },
            {
                path: '/test2',
                element: <div>test1231</div>,
            },
        ],
    },
    {
        path: '/home',
        Component: HomePage,
    },
    {
        path: '/login',
        Component: LoginPage,
    },
]);
