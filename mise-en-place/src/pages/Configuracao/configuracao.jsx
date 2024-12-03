import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from "../../api";
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './configuracao.module.css';
import CameraIcon from "../../utils/img/icons/camera.png";
import Input from "../../components/Input/Text/text";
import Button from "../../components/Button/Default/default";
import ButtonDelete from "../../components/Button/Cancelar/cancelar";
import { useNavigate } from "react-router-dom";

const Configuracao = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [foto, setFoto] = useState('');

    const [fileData, setFileData] = useState(null);

    const [errors, setErrors] = useState({});

    const [canClick, setCanClick] = useState(true);

    useEffect(() => {
        getUsuario();
    }, []);

    useEffect(() => {
        setLogo();
    }, [foto]);

    const getUsuario = async () => {
        try {
            const responseUsuario = await api.get(`/java-api//usuarios/obter-por-email/${sessionStorage.getItem('userEmail')}`);

            setNome(responseUsuario.data.nome);
            setEmail(responseUsuario.data.email);
            setCnpj(responseUsuario.data.cnpj);

            const responseFoto = await api.get(`/java-api//usuarios/obter-foto-cliente?email=${sessionStorage.getItem('userEmail')}`);

            setFoto(responseFoto.data)
            
            console.log("nome: " + nome)

            console.log("Usuario encontrado:")
            console.log(responseUsuario.data)

            return responseUsuario.data
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileData(reader.result);
            };
            reader.readAsArrayBuffer(uploadedFile);
        }
    };

    const setLogo = () => {
        const imgElement = document.getElementById('logoImage');
        if (foto) {
            imgElement.style.width = 'auto';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            imgElement.style.borderRadius = '10px';
            imgElement.src = foto
        } else {
            imgElement.src = CameraIcon
        }
    };

    function arrayBufferToImage(arrayBuffer) {
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);

        const imgElement = document.getElementById('logoImage');
        if (imgElement) {
            imgElement.style.width = 'auto';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            imgElement.style.borderRadius = '10px';
        }

        return imageUrl;
    }

    const logout = async () => {
        try {
            localStorage.clear();
            sessionStorage.clear();

            setTimeout(() => {
                navigate(`/login`);
            }, 2000);
            
            toast.success('Saindo da conta!', { theme: "colored", autoClose: 2000 });
        } catch (error) {
            toast.error('Ocorreu um erro inesperado na tentativa de logout', {theme: "colored"})
            console.log(error);
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!nome.trim()) newErrors.nome = true;
        if (!email.trim()) newErrors.nome = true;
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const atualizar = async (event) => {
        try {
            if(!canClick) return;
            setCanClick(false)
            event?.preventDefault();

            if (!validateForm()) {
                toast.error('Preencha todos os campos obrigatórios!', { theme: "colored" });
                setCanClick(true)
                return;
            }

            let fotoByte = null;

            if (fileData) {
                fotoByte = Array.from(new Uint8Array(fileData));
            }

            await api.put(`/java-api/usuarios/atualizar-por-email/${sessionStorage.getItem('userEmail')}`, {
                "nome": nome,
                "logo": fotoByte,
                "email": email
            });

            sessionStorage.setItem('userEmail', email);

            if (senha) {
                await api.patch(`/java-api/usuarios`, {
                    "email": sessionStorage.getItem('userEmail'),
                    "senha": senha
                });
            }
            
            toast.success('Informações de conta atualizadas!', { theme: "colored", autoClose: 2000 });

            setTimeout(() => {
                navigate(`/dashboard`);
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error('Erro ao atualizar a conta!', { theme: "colored" });
            setCanClick(true);
        } finally {
            setCanClick(true);
        }
    }

    return  (
        <div className={styles["mainContainer"]}>
            <ToastContainer />
            <Sidebar />
            <div className={styles["innerContainer"]}>
                <div className={styles["breadCrumbsContainer"]}>
                    <Breadcrumb />
                </div>
                <div className={styles["tittleCard"]}>
                    <h2>Configurações</h2>
                    <p>Aqui você consegue personalizar sua conta</p>
                </div>

                <div className={styles["configuracaoMainContainer"]}>
                    <div className={styles["imageContainer"]}>
                        <div className={styles["logoCadastroImage"]}
                        onClick={() => document.getElementById('file-upload').click()}>
                            <input type="file"
                            id="file-upload"
                            onChange={handleFileUpload}/>
                            <img
                            id='logoImage'
                            className={styles["logoImage"]}
                            src={fileData ? arrayBufferToImage(fileData) : CameraIcon}/>
                        </div>
                    </div>

                    <div className={styles["inputsContainer"]}>
                        <div className={styles["inputsContainerLine1"]}>
                            <div className={styles["responsividadeInput"]}>
                                <Input
                                    label='Nome da empresa:'
                                    placeholder='Insira o nome da empresa'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={setNome}
                                    defaultValue={nome}
                                    hasError={errors.nome}>
                                </Input>
                            </div>
                            <div className={styles["responsividadeInput"]}>
                                <Input
                                    label='CNPJ:'
                                    fieldWidth="100%"
                                    defaultValue={cnpj}
                                    width='100%'
                                    isDisabled={true}>
                                </Input>
                            </div>
                        </div>
                        <div className={styles["inputsContainerLine2"]}>
                            <div className={styles["responsividadeInput"]}>
                                <Input
                                    label='E-mail:'
                                    placeholder='Insira o e-mail'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={setEmail}
                                    defaultValue={email}
                                    hasError={errors.email}>
                                </Input>
                            </div>
                            <div className={styles["responsividadeInput"]}>
                                <Input
                                    label='Senha:'
                                    placeholder='Insira a nova senha'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={setSenha}
                                    passwordType={true}
                                    hasError={errors.senha}>
                                </Input>
                            </div>
                        </div>
                        <div className={styles["inputsContainerLine3"]}>
                            <div className={styles["responsividadeButton"]}>
                                <ButtonDelete
                                    onClick={logout}
                                    label='Sair da conta'
                                    icon='logout'
                                    iconPosition='left'
                                    width='100%'>
                                </ButtonDelete>
                            </div>
                            <div className={styles["responsividadeButton"]}>
                                <Button
                                    onClick={atualizar}
                                    label='Salvar alterações'
                                    icon='check'
                                    iconPosition='left'
                                    width='100%'>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Configuracao;