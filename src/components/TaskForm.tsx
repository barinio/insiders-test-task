'use client';
import {useState} from 'react';
import {requestAddTask} from "@/lib/api";
import {Task} from "@/types";
import styles from './TaskForm.module.css';
import {toast} from "react-toastify";

export const TaskForm = ({refreshAction}: { refreshAction: () => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [status, setStatus] = useState<Task['status']>('todo');

    const handleSubmit = async () => {
        await requestAddTask({title, description, status});
        toast.success(`Task "${title}" added successfully.`);
        setTitle('');
        setDesc('');
        setStatus('todo');
        refreshAction();
    };

    return (
        <div className={styles.form}>
            <input
                className={styles.input}
                placeholder="Назва"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className={styles.textarea}
                placeholder="Опис"
                value={description}
                onChange={(e) => setDesc(e.target.value)}
            />
            <button className={styles.button} onClick={handleSubmit}>
                Додати задачу
            </button>
        </div>
    );
};
