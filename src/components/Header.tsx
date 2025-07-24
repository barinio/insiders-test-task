'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import styles from "../app/page.module.css";
import {requestLogout} from "@/lib/api";
import {useAuth} from "../../context/AuthContext";


export default function Header() {
    const {isAuth, setIsAuth, loading} = useAuth();
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) setUserEmail(email);
    }, []);

    const handleLogout = async () => {
        router.push('/');
        setIsAuth(false);
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        await requestLogout()
    };

    if (loading) return null;

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logoLink}>
                TODO <span>App</span>
            </Link>

            {isAuth ? (
                <div className={styles.authHeader}>
                    <span className={styles.userEmail}>{userEmail}</span>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Вийти
                    </button>
                </div>
            ) : (
                <nav className={styles.nav}>
                    <Link href="/login" className={styles.navLink}>Вхід</Link>
                    <Link href="/register" className={styles.navLink}>Реєстрація</Link>
                </nav>
            )}
        </header>
    );
}
