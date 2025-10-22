import User from './modules/user';
import type { AxiosInstance } from 'axios';
import { instance } from '@/utils';

class ApiService {
    user: User;
    constructor(axiosInstance: AxiosInstance) {
        this.user = new User(axiosInstance);
    }
}

const $api = new ApiService(instance);

export default $api;
