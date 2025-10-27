import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import useUserStore from '@/store/user';
import { setToken } from '@/lib/storage';
import './style.css';

interface LoginForm {
    username: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const setUserInfo = useUserStore(state => state.setUserInfo);

    const [form, setForm] = useState<LoginForm>({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (field: keyof LoginForm, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.username.trim()) {
            setError('请输入用户名');
            return;
        }
        if (!form.password) {
            setError('请输入密码');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // TODO: 调用登录API
            // const response = await ApiService.user.login(form);

            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockToken = 'mock-jwt-token-' + Date.now();
            const mockUserInfo = {
                id: 1,
                username: form.username,
                email: `${form.username}@example.com`,
            };

            setToken(mockToken);
            setUserInfo(mockUserInfo);
            navigate('/home');
        } catch (err) {
            setError(err instanceof Error ? err.message : '登录失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">欢迎登录</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">用户名</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="请输入用户名"
                            value={form.username}
                            onChange={e => handleInputChange('username', e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">密码</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="请输入密码"
                            value={form.password}
                            onChange={e => handleInputChange('password', e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? '登录中...' : '登录'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
