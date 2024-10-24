import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './produtoEditar.module.css';
import CameraIcon from "../../utils/img/icons/camera.png"
import Input from "../../components/Input/Text/text"
import InputMaskCustomProdutoCadastro from "../../components/Input/InputMask/inputMaskCustomProdutoCadastro"
import Button from "../../components/Button/Default/default";
import ButtonDelete from "../../components/Button/Cancelar/cancelar"
import api from "../../api"
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>

const ProdutoEditar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [produto, setProduto] = useState( location.state?.produto || []);

    const [nome, setNome] = useState(location.state?.produto.nome || '');
    const [preco, setPreco] = useState(parseFloat(location.state?.produto.preco) || '');
    const [descricao, setDescricao] = useState(location.state?.produto.descricao || '');
    const [fotoId, setFoto] = useState(location.state?.produto.foto || '')
    const [massa, setMassa] = useState(location.state?.produto.massa.nome || '');
    const [cobertura, setCobertura] = useState(location.state?.produto.cobertura.nome || '');
    const [recheio, setRecheio] = useState(location.state?.produto.recheio.nome || '');
    const [precoRecheio, setPrecoRecheio] = useState(parseFloat(location.state?.produto.recheio.preco) || '');
    const [unidadeMedida, setUnidadeMedida] = useState(location.state?.produto.unidadeMedida.unidadeMedida || '');
    const [tipoProduto, setTipoProduto] = useState(location.state?.produto.tipoProduto.tipo || '');

    const [unidadeMedidaOptions, setUnidadeMedidaOptions] = useState([]);
    const [massaOptions, setMassaOptions] = useState([]);
    const [coberturaOptions, setCoberturaOptions] = useState([]);
    const [recheioOptions, setRecheioOptions] = useState([]);
    const [tipoProdutoOptions, setTipoProdutoOptions] = useState([]);

    const [unidadeMedidaData, setUnidadeMedidaData] = useState([]);
    const [massaData, setMassaData] = useState([]);
    const [coberturaData, setCoberturaData] = useState([]);
    const [recheioData, setRecheioData] = useState([]);
    const [tipoProdutoData, setTipoProdutoData] = useState([]);

    const [errors, setErrors] = useState({});

    const [canClick, setCanClick] = useState(true);

    useEffect(() => {
        mostrarProduto();
        getUnidadeMedida();
        getMassa();
        getCobertura();
        getRecheio();
        getTipoProduto();
    }, []);

    const mostrarProduto = () => {
        console.log("Produto enviado:")
        console.log(produto);
    }

    const handleRecheioChange = (value) => {
        setRecheio(value);
        handlePrecoRecheio(value);
    };

    const handlePrecoRecheio = async(selectedRecheio) => {
        const recheioEncontrado = recheioData.find(e => e.nome.toLowerCase() === selectedRecheio.toLowerCase());
        if (recheioEncontrado) {
            setPrecoRecheio(recheioEncontrado.preco.toString());
            console.log(precoRecheio)
        }
        console.log(recheio)
    }

    const getUnidadeMedida = async () => {
        try {
            const response = await api.get('/unidades-medida');
            const options = response.data.map(element => ({
                label: element.unidadeMedida,
                value: element.idUnidadeMedida,
            }));
            setUnidadeMedidaOptions(options);
            setUnidadeMedidaData(response.data);

            console.log("Unidade de Medida data:")
            console.log(response.data)

            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const getMassa = async () => {
        try {
            const response = await api.get('/massas');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.idMassa,
            }));
            setMassaOptions(options);
            setMassaData(response.data);

            console.log("Massa data:")
            console.log(response.data)

            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const getCobertura = async () => {
        try {
            const response = await api.get('/coberturas');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.idCobertura,
            }));
            setCoberturaOptions(options);
            setCoberturaData(response.data);

            console.log("Cobertura data:")
            console.log(response.data)

            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const getRecheio = async () => {
        try {
            const response = await api.get('/recheios');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.idRecheio,
            }));
            setRecheioOptions(options);
            setRecheioData(response.data);

            console.log("Recheio data:")
            console.log(response.data)

            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const getTipoProduto = async () => {
        try {
            const response = await api.get('/tipo-produtos');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.id,
            }));
            setTipoProdutoOptions(options);
            setTipoProdutoData(response.data);

            console.log("Tipo produto data:")
            console.log(response.data)

            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const cadastroUnidadeMedida = async () => {
        try {
            if (!unidadeMedidaData.some(e => e.unidadeMedida.toLowerCase() === unidadeMedida.toLowerCase())) {
                await api.post('/unidades-medida', {
                    "unidadeMedida": unidadeMedida
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cadastroMassa = async () => {
        try {
            if (!massaData.some(e => e.nome.toLowerCase() === massa.toLowerCase())) {
                await api.post('/massas', {
                    "nome": massa
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cadastroCobertura = async () => {
        try {
            if (!coberturaData.some(e => e.nome.toLowerCase() === cobertura.toLowerCase())) {
                await api.post('/coberturas', {
                    "nome": cobertura
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cadastroRecheio = async () => {
        try {
            if (!recheioData.some(e => e.nome.toLowerCase() === recheio.toLowerCase())) {
                await api.post('/recheios', {
                    "nome": recheio,
                    "preco": precoRecheio
                });
            } else {
                const recheioEncontrado = recheioData.find(e => e.nome.toLowerCase() === recheio.toLowerCase())

                if (recheioEncontrado.preco !== parseFloat(precoRecheio)) {
                    await api.put(`/recheios/${recheioEncontrado.idRecheio}`, {
                        "nome": recheioEncontrado.nome,
                        "preco": parseFloat(precoRecheio)
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Preencha corretamente o valor do Recheio / Preço do Recheio', { theme: "colored" });
            return;
        }
    };

    const cadastroTipoProduto = async () => {
        try {
            if (!tipoProdutoData.some(e => e.nome.toLowerCase() === tipoProduto.toLowerCase())) {
                await api.post('/tipo-produtos', {
                    "tipo": tipoProduto
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        console.log({
            "preco": preco
        })
        if (!nome.trim()) newErrors.nome = true;
        if (!preco.toString().trim() || preco[0] === ".") newErrors.preco = true;
        if (!descricao.trim()) newErrors.descricao = true;
        if (!massa.trim()) newErrors.massa = true;
        if (!cobertura.trim()) newErrors.cobertura = true;
        if (!recheio.trim()) newErrors.recheio = true;
        if (!precoRecheio.toString().trim() || precoRecheio[0] === ".") newErrors.precoRecheio = true;
        if (!unidadeMedida.trim()) newErrors.unidadeMedida = true;
        if (!tipoProduto.trim()) newErrors.tipoProduto = true;
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const cadastramento = async (event) => {
        if(!canClick) return;
        setCanClick(false)
        event?.preventDefault();

        if (!validateForm()) {
            toast.error('Preencha todos os campos obrigatórios!', { theme: "colored" });
            setCanClick(true)
            return;
        }

        await cadastroRecheio();
        await cadastroMassa();
        await cadastroCobertura();
        await cadastroUnidadeMedida();
        await cadastroTipoProduto();

        const unidadeMedidaDataNow = await getUnidadeMedida();
        const massaDataNow = await getMassa();
        const coberturaDataNow = await getCobertura();
        const recheioDataNow = await getRecheio();
        const tipoProdutoDataNow = await getTipoProduto();

        const recheioEncontrado = recheioDataNow.find(e => e.nome.toLowerCase() === recheio.toLowerCase())
        const recheioId = recheioEncontrado.idRecheio

        const massaEncontrado = massaDataNow.find(e => e.nome.toLowerCase() === massa.toLowerCase())
        const massaId = massaEncontrado.idMassa

        const coberturaEncontrado = coberturaDataNow.find(e => e.nome.toLowerCase() === cobertura.toLowerCase())
        const coberturaId = coberturaEncontrado.idCobertura

        const unidadeMedidaEncontrado = unidadeMedidaDataNow.find(e => e.unidadeMedida.toLowerCase() === unidadeMedida.toLowerCase())
        const unidadeMedidaId = unidadeMedidaEncontrado.idUnidadeMedida

        const tipoProdutoEncontrado = tipoProdutoDataNow.find(e => e.nome.toLowerCase() === tipoProduto.toLowerCase())
        const tipoProdutoId = tipoProdutoEncontrado.id

        try {
            await api.post('/produtos', { 
                "nome": nome,
                "preco": preco,
                "descricao": descricao,
                "foto": fotoId,
                "qtdDisponivel": 1,
                "recheioId": recheioId,
                "massaId": massaId,
                "coberturaId": coberturaId,
                "unidadeMedidaId": unidadeMedidaId,
                "tipoProdutoId": tipoProdutoId
            });

            toast.success('Produto cadastrado com sucesso!', { theme: "colored", autoClose: 2000 });
            setTimeout(() => {
                navigate(`/produtos`)
            }, 2000)
        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar o produto!', { theme: "colored" });
            setCanClick(true)
        }
    };

    const removeProduto = async () => {
        try {
            const response = await api.delete(`/produtos/deletar-produto-por-id/${produto.id}`);
            if (response.status === 202) {
                toast.error('Não é possível remover este produto. Há pedidos vinculados à ele', {theme: "colored"})
            } else if (response.status === 204) {
                toast.success('Produto deletado com sucesso!', {autoClose: 2000, theme:"colored"})
                setTimeout(() => {
                    navigate(`/produtos`);
                }, 2000);
            } else {
                toast.error('Ocorreu um erro inesperado na tentativa de excluir o produto', {theme: "colored"})
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles["mainContainer"]}>
            <ToastContainer />
            <Sidebar />
            <div className={styles["innerContainer"]}>
                <div className={styles["produtoBreadcrumbsContainer"]}>
                    <Breadcrumb />
                </div>
                <div className={styles["produtoEditarTittleCard"]}>
                    <h2>Editar produto</h2>
                    <p>Informe as novas alterações do produto e mantenha sua lista atualizada.</p>
                </div>

                <div className={styles["produtoEditarMainContainer"]}>
                    <div className={styles["imageContainer"]}>
                        <div className={styles["produtoEditarImage"]}>
                            <img src={CameraIcon} />
                        </div>
                    </div>
                    <div className={styles["inputsContainer"]}>
                        <div className={styles["inputsContainerLine1"]}>
                            <Input
                                label='Nome do produto:'
                                placeholder='Insira o nome do produto'
                                fieldWidth="48%"
                                width='100%'
                                onChange={setNome}
                                hasError={errors.nome}
                                defaultValue={produto.nome}>
                            </Input>
                            <InputMaskCustomProdutoCadastro
                                label='Preço:'
                                id='precoInput'
                                width='100%'
                                fieldWidth="23%"
                                value={preco}
                                onChange={setPreco}
                                hasError={errors.preco}
                                defaultValue={produto.preco}>
                            </InputMaskCustomProdutoCadastro>
                            <Input
                                label='Unidade de medida:'
                                placeholder='Selecione a medida'
                                fieldWidth="23%"
                                width='100%'
                                onChange={setUnidadeMedida}
                                availableSelect={true}
                                selectOptions={unidadeMedidaOptions}
                                hasError={errors.unidadeMedida}
                                defaultValue={produto.unidadeMedida.unidadeMedida}>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine2"]}>
                            <Input
                                label='Massa:'
                                placeholder='Insira o tipo de massa'
                                fieldWidth="48%"
                                width='100%'
                                onChange={setMassa}
                                availableSelect={true}
                                selectOptions={massaOptions}
                                hasError={errors.massa}
                                defaultValue={produto.massa.nome}>
                            </Input>
                            <Input
                                label='Cobertura:'
                                placeholder='Insira o tipo de cobertura'
                                fieldWidth="48%"
                                width='100%'
                                onChange={setCobertura}
                                availableSelect={true}
                                selectOptions={coberturaOptions}
                                hasError={errors.cobertura}
                                defaultValue={produto.cobertura.nome}>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine3"]}>
                            <Input
                                label='Recheio:'
                                placeholder='Selecione um recheio'
                                fieldWidth="48%"
                                width='100%'
                                onChange={handleRecheioChange}
                                availableSelect={true}
                                selectOptions={recheioOptions}
                                hasError={errors.recheio}
                                defaultValue={produto.recheio.nome}>
                            </Input>
                            <InputMaskCustomProdutoCadastro
                                label='Preço do recheio:'
                                id='precoCoberturaInput'
                                width='100%'
                                fieldWidth="48%"
                                value={precoRecheio}
                                onChange={setPrecoRecheio}
                                hasError={errors.precoRecheio}
                                defaultValue={produto.recheio.preco}
                            >
                            </InputMaskCustomProdutoCadastro>
                        </div>
                        <div className={styles["inputsContainerLine4"]}>
                            <Input
                                label='Descrição:'
                                placeholder='Insira a descrição do novo produto'
                                fieldWidth="65%"
                                width='100%'
                                onChange={setDescricao}
                                hasError={errors.descricao}
                                defaultValue={produto.descricao}>
                            </Input>
                            <Input
                                label='Tipo de produto:'
                                placeholder='Selecione o tipo'
                                fieldWidth="31%"
                                width='100%'
                                onChange={setTipoProduto}
                                availableSelect={true}
                                selectOptions={tipoProdutoOptions}
                                hasError={errors.tipoProduto}
                                defaultValue={produto.tipoProduto.tipo}>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine5"]}>
                            <ButtonDelete
                                onClick={removeProduto}
                                label='Excluir produto'
                                icon='delete'
                                iconPosition='left'
                                width='25%'>
                            </ButtonDelete>
                            <Button
                                onClick={cadastramento}
                                label='Cadastrar produto'
                                icon='check'
                                iconPosition='left'
                                width='25%'>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdutoEditar;
