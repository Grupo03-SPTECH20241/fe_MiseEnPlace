import React, { useState } from 'react';
import cadastroStyles from './cadastro.module.css';
import BlueWave from '../../utils/img/BlueWave.svg';
import ConfeiteiraImage from '../../utils/img/ConfeiteiraImage.svg';

function Cadastro() {
    const [fileName, setFileName] = useState('');

    const handleFileUpload = (event) => {
        setFileName(event.target.files[0].name);
    };

    return (
        <div className={cadastroStyles['App']}>
            <div className={cadastroStyles['form-container']}>
                <div className={cadastroStyles['left-container']}>
                    <div>
                        <span>Bem vindo!</span>
                        <p>Cadastre os novos clientes e os ajude a desenvolver seu negócio.</p>
                    </div>
                    <img src={ConfeiteiraImage} alt="Confeiteira" className={cadastroStyles['confeiteira']} />
                </div>
                <div className={cadastroStyles['form-content']}>
                    <span>Mise en Place</span>
                    <div className={cadastroStyles['form-group']}>
                        <label>Nome da empresa:</label>
                        <input type="text" name="companyName" placeholder="Inserir nome" />
                    </div>
                    <div className={cadastroStyles['form-group']}>
                        <label>E-mail:</label>
                        <input type="email" name="email" placeholder="Inserir e-mail" />
                    </div>
                    <div className={cadastroStyles['form-group']}>
                        <label>CNPJ:</label>
                        <input type="text" name="cnpj" placeholder="999.999.999-99" />
                    </div>
                    <div className={cadastroStyles['form-group']}>
                        <label>Upload File</label>
                        <div className={cadastroStyles['custom-file-upload']} onClick={() => document.getElementById('file-upload').click()}>
                            {fileName || 'Selecione um arquivo'}
                        </div>
                        <input id="file-upload" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </div>
                    <button type="submit">Cadastrar</button>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;