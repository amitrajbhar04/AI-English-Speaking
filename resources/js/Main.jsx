import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CourseLessons from './pages/CourseLessons.jsx';
import PracticeSpeaking from './pages/PracticeSpeaking.jsx';

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses/:courseId" element={<CourseLessons />} />
            <Route path="/lessons/:lessonId/practice" element={<PracticeSpeaking />} />
        </Routes>
    );
}