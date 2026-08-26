import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios.js';

export default function CourseLessons() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        api.get(`/courses/${courseId}`).then((res) => setCourse(res.data));
    }, [courseId]);

    if (!course) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h1>{course.title}</h1>
            <div style={{ display: 'grid', gap: 12 }}>
                {course.lessons.map((lesson) => (
                    <Link key={lesson.id} to={`/lessons/${lesson.id}/practice`}
                        style={{ padding: 16, background: '#fff', borderRadius: 8, textDecoration: 'none', color: '#000' }}>
                        <h3>{lesson.title}</h3>
                        <p>{lesson.difficulty}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}