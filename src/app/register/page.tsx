'use client';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import styles from './RegisterPage.module.css';
import {requestRegister} from "@/lib/api";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const register = async () => {
        if (!isValidEmail(email)) {
            toast.error('Некоректний email');
            return;
        }

        if (password.length < 8) {
            toast.error('Пароль має містити щонайменше 8 символів');
            return;
        }

        try {
            await requestRegister({email, password});
            toast.success('Успішна реєстрація!');
            router.push('/login');
        } catch (error) {
            const err = error as AxiosError<{ error: string }>;
            toast.error(err.response?.data.error || 'Невідома помилка');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Реєстрація</h2>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button className={styles.button} onClick={register}>
                Зареєструватись
            </button>
        </div>
    );
}
