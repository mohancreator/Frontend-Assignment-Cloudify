// src/App.js
import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import './App.css';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : '';
    }, [darkMode]);

    return (
        <div className="App">
            <h1>Cloudify Assignment</h1>
            <label>
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                Dark Mode
            </label>
            <Table />
        </div>
    );
};

export default App;
