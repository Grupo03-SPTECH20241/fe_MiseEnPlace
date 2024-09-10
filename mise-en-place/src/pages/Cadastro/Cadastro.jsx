import React, { useState } from 'react';
import cadastroStyles from './cadastro.module.css';
import BlueWave from '../../utils/img/BlueWave.svg';
import ConfeiteiraImage from '../../utils/img/ConfeiteiraImage.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import api from '../../api';
import InputMask from 'react-input-mask'; // Importando a biblioteca para máscara de entrada
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const [filePath, setFilePath] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o bloqueio do botão
    const navigate = useNavigate();

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            const path = URL.createObjectURL(uploadedFile);
            let stringLogo = path.split('blob:');
            setFilePath(stringLogo[1]); // Armazenar apenas o caminho do arquivo
        }
    };

    const cancelSubmit = () => {
        navigate('/login');
    };

    const handleCadastro = async (event) => {
        event.preventDefault();

        // Verificar se já está submetendo o formulário
        if (isSubmitting) {
            return; // Impedir múltiplos envios
        }

        if (!filePath || !nome || !email || !cnpj) {
            toast.error('Por favor, preencha todos os campos e selecione um arquivo.', { theme: 'colored' });
            return;
        }

        // Construindo o payload para enviar apenas o caminho do arquivo e os dados do formulário
        const payload = {
            nome,
            email,
            cnpj,
            logo: filePath // Enviando apenas o caminho do arquivo
        };

        // Bloquear o botão
        setIsSubmitting(true);

        try {
            await api.post('/usuarios', payload);
            toast.success('Cadastro efetuado com sucesso!', { theme: 'colored' });

            // Limpar os campos após o sucesso
            setNome('');
            setEmail('');
            setCnpj('');
            setFilePath('');

            setTimeout(() => {
                navigate('/login');
            }, 6000);
        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar cliente', { theme: 'colored' });
        } finally {
            // Desbloquear o botão após a resposta do servidor
            setIsSubmitting(false);
        }
    };

    return (
        <div className={cadastroStyles['App']}>
            <ToastContainer />
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
                    <form onSubmit={handleCadastro}>
                        <div className={cadastroStyles['form-group']}>
                            <label>Nome da empresa:</label>
                            <input type="text" name="companyName" placeholder="Inserir nome" value={nome} onChange={e => setNome(e.target.value)} />
                        </div>
                        <div className={cadastroStyles['form-group']}>
                            <label>E-mail:</label>
                            <input type="email" name="email" placeholder="Inserir e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className={cadastroStyles['form-group']}>
                            <label>CNPJ:</label>
                            <InputMask
                                mask="99.999.999/9999-99" // Máscara para o formato de CNPJ
                                value={cnpj}
                                onChange={e => setCnpj(e.target.value)}
                            >
                                {(inputProps) => <input {...inputProps} type="text" placeholder="99.999.999/9999-99" />}
                            </InputMask>
                        </div>
                        <div className={cadastroStyles['form-group']}>
                            <label>Upload File</label>
                            <div className={cadastroStyles['custom-file-upload']} onClick={() => document.getElementById('file-upload').click()}>
                                {filePath || 'Selecione um arquivo'}
                            </div>
                            <input id="file-upload" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                        </div>
                        <button 
                            className={cadastroStyles['buttonCadastro-submit']} 
                            type="submit" 
                            disabled={isSubmitting} // Desabilitar o botão durante o envio
                        >
                            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
    