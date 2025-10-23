import './App.css';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

function App() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <p className="text">这是一段测试文本啊</p>
                <img src="https://upload.42how.com/article/PBDk4S__1686554357384.jpeg?x-oss-process=image/resize,w_400/format,webp" alt="" />
            </div>
            <button
                className="text"
                onClick={() => {
                    navigate('/test1');
                }}
            >
                to test1
            </button>
            <button
                className="text"
                onClick={() => {
                    navigate('/test2');
                }}
            >
                to test2
            </button>
            <button
                className="text"
                onClick={() => {
                    navigate(-1);
                }}
            >
                back
            </button>
            <Outlet />
        </>
    );
}

export default App;
