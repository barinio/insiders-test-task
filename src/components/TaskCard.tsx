'use client';
import { Task } from '@/types';
import { FC } from 'react';
import styles from './TaskCard.module.css';

export const TaskCard: FC<{
    task: Task;
    onStatusChange?: (id: string, newStatus: Task['status']) => void
}> = ({ task, onStatusChange }) => {
    const statusClass = {
        'todo': styles.statusTodo,
        'in progress': styles.statusInProgress,
        'done': styles.statusDone
    }[task.status];

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onStatusChange) {
            onStatusChange(task.id, e.target.value as Task['status']);
        }
    };

    return (
        <div className={`${styles.card} ${statusClass}`}>
            <h3 className={styles.title}>{task.title}</h3>
            <p className={styles.description}>{task.description}</p>

            <div className={styles.statusContainer}>
                <select
                    value={task.status}
                    onChange={handleStatusChange}
                    className={styles.statusSelect}
                >
                    <option value="todo">To Do</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    );
};
