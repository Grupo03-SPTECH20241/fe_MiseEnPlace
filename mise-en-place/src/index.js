import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/home';
import Header from './components/Header/header';
import Sidebar from './components/Sidebar/sidebar';
import Default from './components/Button/Default/default';
import Cancelar from './components/Button/Cancelar/cancelar';
import Disabled from './components/Button/Disabled/disabled';
import Defaultv from './components/Button/Default-variant/defaultv';
import Cancelarv from './components/Button/Cancelar-variant/cancelarv';
import Filter from './components/Filter/filter';
import Spinner from './components/Spinner/spinner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<Spinner />
</React.StrictMode>
);