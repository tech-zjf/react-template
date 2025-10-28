import type { UserInfo } from '@/services/modules/user/interface';

export const USER_INFO_KEY = 'USER_INFO';
export const TOKEN_KEY = 'TOKEN';

/**
 * 从 localStorage 获取 JSON 数据
 */
const getStorageItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Failed to parse ${key} from localStorage:`, error);
        return null;
    }
};

/**
 * 设置 localStorage 数据
 */
const setStorageItem = (key: string, value?: string | object) => {
    if (!value) {
        localStorage.removeItem(key);
        return;
    }
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
};

/**
 * 获取用户信息
 */
export const getUserInfo = (): UserInfo | null => {
    return getStorageItem<UserInfo>(USER_INFO_KEY);
};

/**
 * 设置用户信息
 */
export const setUserInfo = (userInfo?: UserInfo) => {
    setStorageItem(USER_INFO_KEY, userInfo);
};

/**
 * 获取 Token
 */
export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * 设置 Token
 */
export const setToken = (token?: string) => {
    setStorageItem(TOKEN_KEY, token);
};

/**
 * 清除所有认证信息
 */
export const clearAuth = () => {
    localStorage.removeItem(USER_INFO_KEY);
    localStorage.removeItem(TOKEN_KEY);
};
