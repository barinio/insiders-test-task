import axios from 'axios';
import {AuthResponse, AuthUser, Task} from "@/types";

export const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const setToken: (token: string) => void = token => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const requestRegister: (body: AuthUser) => Promise<AuthResponse> = async body => {
    const {data} = await instance.post('/auth/register', body);
    setToken(data.token);
    return data;
};

export const requestLogin: (body: AuthUser) => Promise<AuthResponse> = async body => {
    const {data} = await instance.post('/auth/login', body);
    setToken(data.token);
    return data;
};

export const requestLogout = async () => {
    const {data} = await instance.post('/auth/logout');
    return data;
};

export const requestRefreshUser = async () => {
    const {data} = await instance.get('/auth/current');
    return data;
};

// ---------------- TASKS -------------------

export const requestTasks = async (params?: { status?: string }) => {
    const {data} = await instance.get('/tasks', { params });
    return data;
};
export const requestAddTask = async (newTask: Omit<Task, 'id'>) => {
    const {data} = await instance.post('/tasks', newTask);
    return data;
};
export const requestDeleteTask = async (taskId: string) => {
    const {data} = await instance.delete(`/tasks/${taskId}`);
    return data;
};

export const requestUpdateTask = async (taskId: string, status: { status: Task['status'] }) => {
    const {data} = await instance.patch(`/tasks/${taskId}`, status);
    return data;
};

