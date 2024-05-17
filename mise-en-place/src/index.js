import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/home';
import Header from './components/Header/header';
import Sidebar from './components/Sidebar/sidebar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<Sidebar />
</React.StrictMode>
);