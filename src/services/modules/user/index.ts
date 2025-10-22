import type { AxiosInstance } from 'axios';
import type { UserInfo } from './interface';

class User {
    axios: AxiosInstance;
    constructor(axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }

    /** 获取我的信息 */
    async fetchMyInfo(): Promise<UserInfo> {
        const { data } = await this.axios.get('/mine');
        return data;
    }
}

export default User;
