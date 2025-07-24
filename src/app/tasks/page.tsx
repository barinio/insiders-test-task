'use client';

import {useEffect, useState} from 'react';
import {TaskForm} from '@/components/TaskForm';
import {TaskCard} from '@/components/TaskCard';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {Task} from '@/types';
import {requestTasks, requestUpdateTask} from "@/lib/api";
import styles from './TasksPage.module.css';
import {Autoplay} from "swiper/modules";
import {useAuth} from "../../../context/AuthContext";

export default function TasksPage() {
    const { isAuth, loading } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [tasksLoading, setTasksLoading] = useState(true);

    const loadTasks = async () => {
        try {
            setTasksLoading(true);
            const data = await requestTasks(statusFilter ? {status: statusFilter} : undefined);
            setTasks(data);
        } finally {
            setTasksLoading(false);
        }
    };


    const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
        try {
            setTasks(tasks.map(task =>
                task.id === taskId ? {...task, status: newStatus} : task
            ));
            await requestUpdateTask(taskId, {status: newStatus});
        } catch (error) {
            console.error('Failed to update task status:', error);
            loadTasks();
        }
    };

    useEffect(() => {
        if (!loading && isAuth) {
            loadTasks();
        }
    }, [loading, isAuth, statusFilter]);



    if (tasksLoading) {
        return <div className={styles.loading}>Завантаження задач...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Задачі</h1>

            <TaskForm refreshAction={loadTasks}/>

            <select
                className={styles.select}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="">Усі</option>
                <option value="todo">To Do</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
            </select>

            <Swiper spaceBetween={10} slidesPerView={3.5} modules={[Autoplay]} autoplay={{delay: 5000}}>
                {tasks.map((task) => (
                    <SwiperSlide key={task.id}>
                        <TaskCard
                            task={task}
                            onStatusChange={handleStatusChange}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
