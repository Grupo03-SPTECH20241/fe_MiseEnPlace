import React, { useState } from 'react';
import LoginStyles from './login.module.css';
import ConfeiteiraImage from '../../utils/img/ConfeiteiraImage.svg';
import api from '../../api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        api.post('/usuarios/login', { "email": email, "senha": password }).then((response) => {
            console.log(response, "deu certo")
        }).catch((error) => {
            console.log(error, "error")
        })
    };

    return (
        <div className={LoginStyles['App']}>
            <div className={LoginStyles['form-container']}>
                <div className={LoginStyles['left-container']}>
                    <div className={LoginStyles['initial-container']}>
                        <span>Seja bem vindo!</span>
                        <p>Faça login e acompanhe o desenvolvimento da sua confeitaria</p>
                    </div>
                    <img src={ConfeiteiraImage} alt="Confeiteira" className={LoginStyles['confeiteira']} />
                </div>
                <form onSubmit={handleLogin} className={LoginStyles['form-content']}>
                    <span>Mise en Place</span>
                    <div className={LoginStyles['form-group']}>
                        <label>E-mail:</label>
                        <input type="email" name="email" placeholder="Inserir e-mail" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className={LoginStyles['form-group']}>
                        <label>Senha:</label>
                        <input type="password" name="password" placeholder="Insira sua senha" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;