import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

function App() {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    return (
        <>
            <div className="flex justify-center gap-8 my-4 align-center">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1 className="text-4xl font-bold text-center">Vite + React</h1>
            <div className="card">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setCount(count => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            <div className="flex gap-2 justify-center mt-4">
                <button
                    className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        navigate('/test1');
                    }}
                >
                    to test1
                </button>
                <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        navigate('/test2');
                    }}
                >
                    to test2
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    back
                </button>
            </div>
            <Outlet />
        </>
    );
}

export default App;
