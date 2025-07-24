'use client';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import styles from './LoginPage.module.css';
import {requestLogin} from "@/lib/api";
import {AuthResponse} from "@/types";
import {useAuth} from "../../../context/AuthContext";
import {toast} from "react-toastify";

export default function LoginPage() {
    const {setIsAuth} = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        localStorage.setItem('email', email);

        try {
            const data: AuthResponse = await requestLogin({email, password});
            localStorage.setItem('token', data.token);
            setIsAuth(true);
            router.push('/tasks');
        } catch {
            toast.error("Ще не авторизовані" );
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Вхід</h2>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label className={styles.label}>
                <input
                    type="password"
                    placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <button className={styles.button} onClick={login}>
                Увійти
            </button>
        </div>
    );
}
