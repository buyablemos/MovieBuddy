
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client'; // Użyj 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root'); // Znajdź kontener
const root = ReactDOM.createRoot(container!); // Użyj createRoot

root.render(
    <React.StrictMode>
        <BrowserRouter> {}
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
