import './App.css';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import useGlobalStore from './store/global';

function App() {
    const navigate = useNavigate();
    const { deferredPrompt } = useGlobalStore();
    return (
        <>
            <div>
                <p className="text">这是一段测试文本啊</p>
                <img src="https://upload.42how.com/article/PBDk4S__1686554357384.jpeg?x-oss-process=image/resize,w_400/format,webp" alt="" />
            </div>
            {!!deferredPrompt && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, zIndex: 999 }}
                    onClick={() => {
                        deferredPrompt.prompt();
                        deferredPrompt.userChoice.then(choiceResult => {
                            // 用户选择了安装或取消
                            // 例如：setShowInstall(false)
                            // deferredPrompt = null;
                        });
                    }}
                >
                    <p>下载</p>
                </div>
            )}
            <div></div>
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
