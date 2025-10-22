import type { UserInfo } from '@/services/modules/user/interface';

export const USER_INFO_KEY = 'USER_INFO';

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
