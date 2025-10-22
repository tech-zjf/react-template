import type { UserInfo } from '@/services/modules/user/interface';
import { create } from 'zustand';

export interface UserState {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void;
}

const useUserStore = create<UserState>(set => ({
    userInfo: null,

    setUserInfo: userInfo => set({ userInfo }),
}));

export default useUserStore;
