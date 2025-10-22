import axios from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { RESPONSE_CODE } from '@/services/constants';
import {} from '@/services/interface';
import type { ApiResponse } from '@/services/interface';

export const instance = axios.create({
    baseURL: 'xxx',
});

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const requestErrorHandler = (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
};

const responseInterceptor = (response: AxiosResponse<ApiResponse>): any => {
    const res = response.data;

    // 未登录处理
    if (res.code === RESPONSE_CODE.UNAUTHORIZED) {
        localStorage.removeItem('token');
        // TODO: 打开登录弹窗 / 跳转登录页
        throw new Error(res.msg);
    }

    // 其他业务错误处理
    if (res.code !== RESPONSE_CODE.SUCCESS) {
        throw new Error(res.msg);
    }

    return res;
};

const responseErrorHandler = (error: unknown): Promise<never> => {
    if (axios.isCancel(error)) {
        const cancelError = error as AxiosError;
        console.error('Request canceled:', cancelError.message);
        return Promise.reject(error);
    }

    return Promise.reject(error);
};

instance.interceptors.request.use(requestInterceptor, requestErrorHandler);
instance.interceptors.response.use(responseInterceptor, responseErrorHandler);
