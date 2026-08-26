import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import '../../css/Dashboard.css';

export default function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get('/courses').then((res) => setCourses(res.data)),
            api.get('/progress').then((res) => setProgress(res.data)),
        ]).finally(() => setLoading(false));
    }, []);

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Your Courses</h1>
                    <p className="dashboard-subtitle">Keep going, you're doing great! 🎯</p>
                </div>

                {loading ? (
                    <div className="skeleton-grid">
                        <div className="skeleton-card stat-skeleton" />
                        <div className="skeleton-card" />
                        <div className="skeleton-card" />
                    </div>
                ) : (
                    <>
                        {progress && (
                            <div className="stats-row">
                                <div className="stat-card">
                                    <span className="stat-icon">📝</span>
                                    <div>
                                        <p className="stat-value">{progress.total_attempts}</p>
                                        <p className="stat-label">Total Attempts</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-icon">🏆</span>
                                    <div>
                                        <p className="stat-value">{progress.average_score}%</p>
                                        <p className="stat-label">Average Score</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {courses.length === 0 ? (
                            <div className="empty-state">
                                <span className="empty-icon">📖</span>
                                <p>No courses available yet. Check back soon!</p>
                            </div>
                        ) : (
                            <div className="courses-grid">
                                {courses.map((course) => (
                                    <Link key={course.id} to={`/courses/${course.id}`} className="course-card">
                                        <div className="course-card-top">
                                            <span className={`level-badge level-${course.level?.toLowerCase()}`}>
                                                {course.level}
                                            </span>
                                        </div>
                                        <h3>{course.title}</h3>
                                        <p className="course-meta">📘 {course.lessons_count} lessons</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}