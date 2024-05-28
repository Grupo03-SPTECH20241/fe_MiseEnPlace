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
import Breadcrumbs from './components/Texts/Breadcrumbs/breadcrumbs';
import Contente from './components/Texts/Contente/contente';
import Divisor from './components/Texts/Divisor/divisor';
import Avatar from './components/Texts/Avatar/avatar';
// import Login from './pages/Login/login';
import Cadastro from './pages/Cadastro/Cadastro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<Cadastro />
</React.StrictMode>
);