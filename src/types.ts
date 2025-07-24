
export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in progress' | 'done';
}

export interface AuthUser {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
    }
}
