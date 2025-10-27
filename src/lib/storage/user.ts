import type { UserInfo } from '@/services/modules/user/interface';

export const USER_INFO_KEY = 'USER_INFO';
export const TOKEN_KEY = 'TOKEN';

export const getUserInfo = (): string | null => {
    const temp = localStorage.getItem(USER_INFO_KEY);
    return temp ? JSON.parse(temp) : null;
};

export const setUserInfo = (userInfo?: UserInfo) => {
    if (!userInfo) {
        localStorage.removeItem(USER_INFO_KEY);
        return;
    }
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token?: string) => {
    if (!token) {
        localStorage.removeItem(TOKEN_KEY);
        return;
    }
    localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuth = () => {
    localStorage.removeItem(USER_INFO_KEY);
    localStorage.removeItem(TOKEN_KEY);
};
