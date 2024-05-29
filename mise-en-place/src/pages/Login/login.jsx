import React, { useState } from 'react';
import LoginStyles from './login.module.css';
import ConfeiteiraImage from '../../utils/img/ConfeiteiraImage.svg';

function Login() {

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
                <div className={LoginStyles['form-content']}>
                    <span>Mise en Place</span>
                    <div className={LoginStyles['form-group']}>
                        <label>E-mail:</label>
                        <input type="email" name="email" placeholder="Inserir e-mail" />
                    </div>
                    <div className={LoginStyles['form-group']}>
                        <label>Senha:</label>
                        <input type="password" name="companyName" placeholder="Insira sua senha" />
                    </div>
                    <button type="submit">Entrar</button>
                </div>
            </div>
        </div>
    );
}

export default Login;