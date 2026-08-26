import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main.jsx';

const root = document.getElementById('root');
createRoot(root).render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
);
