'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import styles from "./page.module.css";
import Loading from "@/components/Loading";
import {useAuth} from "../../context/AuthContext";

export default function HomePage() {
    const {isAuth, setIsAuth, loading, setLoading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
            router.replace('/tasks');
        } else {
            setIsAuth(false);
        }
        setLoading(false);
    }, [router]);

    if (loading) return <Loading/>;

    return (
        <>
            {isAuth ? (
                <p className={styles.textGray}>
                    Ви авторизовані, зараз вас перенаправлять на ваші задачі...
                </p>
            ) : (
                <div className={styles.mainContainer}>
                    <h1 className={styles.title}>
                        Ласкаво просимо до TODO App!
                    </h1>
                    <p className={styles.textGrayLight}>
                        Щоб почати керувати своїми задачами, будь ласка, увійдіть або зареєструйтесь.
                    </p>
                    <div className={styles.buttonGroup}>
                        <Link
                            href="/login"
                            className={styles.buttonPrimary}
                        >
                            Увійти
                        </Link>
                        <Link
                            href="/register"
                            className={styles.buttonSecondary}
                        >
                            Зареєструватись
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
