import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumbs from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './produtoCadastro.module.css';
import CameraIcon from "../../utils/img/icons/camera.png"
import Input from "../../components/Input/Text/text"
import InputMaskCustomProdutoCadastro from "../../components/Input/InputMask/inputMaskCustomProdutoCadastro"
import Button from "../../components/Button/Default/default"
import api from "../../api"
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>

const ProdutoCadastro = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [massa, setMassa] = useState('');
    const [cobertura, setCobertura] = useState('');
    const [recheio, setRecheio] = useState('');
    const [precoRecheio, setPrecoRecheio] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    const [tipoProduto, setTipoProduto] = useState('');

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

    const [canClick, setCanClick] = useState({});

    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        getUnidadeMedida();
        getMassa();
        getCobertura();
        getRecheio();
        getTipoProduto();
    }, []);

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

    const getUnidadeMedida = async () => {
        try {
            const response = await api.get('/java-api/unidades-medida');
            const options = response.data.map(element => ({
                label: element.unidadeMedida,
                value: element.idUnidadeMedida,
            }));
            setUnidadeMedidaOptions(options);
            setUnidadeMedidaData(response.data);
            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const getMassa = async () => {
        try {
            const response = await api.get('/java-api/massas');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.idMassa,
            }));
            setMassaOptions(options);
            setMassaData(response.data);
            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const getCobertura = async () => {
        try {
            const response = await api.get('/java-api/coberturas');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.idCobertura,
            }));
            setCoberturaOptions(options);
            setCoberturaData(response.data);
            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const getRecheio = async () => {
        try {
            const response = await api.get('/java-api/recheios');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.idRecheio,
            }));
            setRecheioOptions(options);
            setRecheioData(response.data);
            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const getTipoProduto = async () => {
        try {
            const response = await api.get('/java-api/tipo-produtos');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.id,
            }));
            setTipoProdutoOptions(options);
            setTipoProdutoData(response.data);
            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    const cadastroUnidadeMedida = async () => {
        try {
            if (!unidadeMedidaData.some(e => e.unidadeMedida.toLowerCase() === unidadeMedida.toLowerCase())) {
                await api.post('/java-api/unidades-medida', {
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
                await api.post('/java-api/massas', {
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
                await api.post('/java-api/coberturas', {
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
                await api.post('/java-api/recheios', {
                    "nome": recheio,
                    "preco": precoRecheio
                });
            } else {
                const recheioEncontrado = recheioData.find(e => e.nome.toLowerCase() === recheio.toLowerCase())

                if (recheioEncontrado.preco !== parseFloat(precoRecheio)) {
                    await api.put(`/java-api/recheios/${recheioEncontrado.idRecheio}`, {
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
                await api.post('/java-api/tipo-produtos', {
                    "tipo": tipoProduto
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    function arrayBufferToImage(arrayBuffer) {
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);

        const imgElement = document.getElementById('produtoImage');
        if (imgElement) {
            imgElement.style.width = 'auto';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            imgElement.style.borderRadius = '10px';
        }

        return imageUrl;
    }

    const handleRecheioChange = (value) => {
        setRecheio(value);
        handlePrecoRecheio(value);
      };
      

    const handlePrecoRecheio = async(selectedRecheio) => {
        const recheioEncontrado = recheioData.find(e => e.nome.toLowerCase() === selectedRecheio.toLowerCase());
        if (recheioEncontrado) {
            setPrecoRecheio(recheioEncontrado.preco.toString());
        }
    }

    const getProdutos = async () => {
        try {
            const response = await api.get('/java-api/produtos');

            console.log("Produtos cadastrados:")
            console.log(response.data)

            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const validateForm = () => {
        const newErrors = {};
        if (!nome.trim()) newErrors.nome = true;
        if (!preco.trim() || preco[0] === ".") newErrors.preco = true;
        if (!descricao.trim()) newErrors.descricao = true;
        if (((precoRecheio && !recheio.trim()) || (!precoRecheio && recheio.trim())) && (recheio.toLowerCase() != "n/a")) {
            newErrors.precoRecheio = true;
            newErrors.recheio = true;
        }
        if (!unidadeMedida.trim()) newErrors.unidadeMedida = true;
        if (!tipoProduto.trim()) newErrors.tipoProduto = true;
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const produtoExisteAsync = async () => {
        const produtosEncontrados = await getProdutos();

        const nomeEncontrado = produtosEncontrados.some(e => e.nome === nome);

        var massaEncontrado;
        var recheioEncontrado;
        var coberturaEncontrado;

        if (nomeEncontrado) {
            const produtoEncontrado = produtosEncontrados.find(e => e.nome.toLowerCase() === nome.toLowerCase())

            massaEncontrado = await massaIgualAsync(produtoEncontrado, produtoEncontrado.massa.id);
            recheioEncontrado = await recheioIgualAsync(produtoEncontrado, produtoEncontrado.recheio.id);
            coberturaEncontrado = await coberturaIgualAsync(produtoEncontrado, produtoEncontrado.cobertura.id);

            if (massaEncontrado && recheioEncontrado && coberturaEncontrado) {
                return true;
            }
        }

        return false;
    }

    const massaIgualAsync = async (produto, id) => {
        try {
            const massaEncontradoNow = await api.get(`/java-api/massas/${id}`);

            if (massaEncontradoNow.data.nome.toLowerCase() === massa.toLowerCase()) return true;

            return false;
        } catch (error) {
            console.log(error);
        }
    };

    const recheioIgualAsync = async (produto, id) => {
        try {
            const recheioEncontradoNow = await api.get(`/java-api/recheios/${id}`);

            if (recheioEncontradoNow.data.nome.toLowerCase() === recheio.toLowerCase() && recheioEncontradoNow.data.preco === precoRecheio) return true;

            return false;
        } catch (error) {
            console.log(error);
        }
    };

    const coberturaIgualAsync = async (produto, id) => {
        try {
            const coberturaEncontradoNow = await api.get(`/java-api/coberturas/${id}`);

            if (coberturaEncontradoNow.data.nome.toLowerCase() === cobertura.toLowerCase()) return true;

            return false;
        } catch (error) {
            console.log(error);
        }
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

        const produtoExiste = await produtoExisteAsync();

        if (produtoExiste) {
            toast.error('Produto já existe!', { theme: "colored" });
            setCanClick(true)
            return;
        }

        if ((recheio && precoRecheio) && (recheio.toLowerCase() != "n/a")) await cadastroRecheio();
        if (massa && massa.toLowerCase() != "n/a") await cadastroMassa();
        if (cobertura && cobertura.toLowerCase() != "n/a") await cadastroCobertura();
        await cadastroUnidadeMedida();
        await cadastroTipoProduto();

        const unidadeMedidaDataNow = await getUnidadeMedida();
        const massaDataNow = await getMassa();
        const coberturaDataNow = await getCobertura();
        const recheioDataNow = await getRecheio();
        const tipoProdutoDataNow = await getTipoProduto();

        var recheioEncontrado = recheioDataNow.find(e => e.nome.toLowerCase() === recheio.toLowerCase())
        if (!recheioEncontrado) {
            recheioEncontrado = recheioDataNow.find(e => e.nome.toLowerCase() === "n/a")
        }
        const recheioId = recheioEncontrado ? recheioEncontrado.idRecheio : null

        var massaEncontrado = massaDataNow.find(e => e.nome.toLowerCase() === massa.toLowerCase())
        if (!massaEncontrado) {
            massaEncontrado = massaDataNow.find(e => e.nome.toLowerCase() === "n/a")
        }
        const massaId = massaEncontrado ? massaEncontrado.idMassa : null

        var coberturaEncontrado = coberturaDataNow.find(e => e.nome.toLowerCase() === cobertura.toLowerCase())
        if (!coberturaEncontrado) {
            coberturaEncontrado = coberturaDataNow.find(e => e.nome.toLowerCase() === "n/a")
        }
        const coberturaId = coberturaEncontrado ? coberturaEncontrado.idCobertura : null

        const unidadeMedidaEncontrado = unidadeMedidaDataNow.find(e => e.unidadeMedida.toLowerCase() === unidadeMedida.toLowerCase())
        const unidadeMedidaId = unidadeMedidaEncontrado.idUnidadeMedida

        const tipoProdutoEncontrado = tipoProdutoDataNow.find(e => e.nome.toLowerCase() === tipoProduto.toLowerCase())
        const tipoProdutoId = tipoProdutoEncontrado.id
        let foto = null;

        if (fileData !== null) {
            foto = Array.from(new Uint8Array(fileData));
        }

        try {
            await api.post('/java-api/produtos', { 
                "nome": nome,
                "preco": preco,
                "descricao": descricao,
                "foto": foto,
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

    return (
        <div className={styles["mainContainer"]}>
            <ToastContainer />
            <Sidebar />
            <div className={styles["innerContainer"]}>
                <div className={styles["produtoBreadcrumbsContainer"]}>
                    <Breadcrumbs/>
                </div>
                <div className={styles["produtoCadastroTittleCard"]}>
                    <h2>Cadastrar produto</h2>
                    <p>Cadastre um novo produtinho para os seus clientes.</p>
                </div>

                <div className={styles["produtoCadastroMainContainer"]}>
                    <div className={styles["imageContainer"]}>
                        <div className={styles["produtoCadastroImage"]}
                        onClick={() => document.getElementById('file-upload').click()}>
                            <input type="file"
                            id="file-upload"
                            onChange={handleFileUpload}/>
                            <img
                            id='produtoImage'
                            className={styles["productImage"]}
                            src={fileData ? arrayBufferToImage(fileData) : CameraIcon}/>
                        </div>
                    </div>
                    <div className={styles["inputsContainer"]}>
                        <div className={styles["inputsContainerLine1"]}>
                            <div className={styles["responsividadeInputNomeProduto"]}>
                                <Input
                                    label='Nome do produto: *'
                                    placeholder='Insira o nome do produto'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={setNome}
                                    hasError={errors.nome}>
                                </Input>
                            </div>
                            <div className={styles["responsividadeInputPreco"]}>
                                <InputMaskCustomProdutoCadastro
                                    label='Preço: *'
                                    id='precoInput'
                                    width='100%'
                                    fieldWidth="100%"
                                    value={preco}
                                    onChange={setPreco}
                                    hasError={errors.preco}>
                                </InputMaskCustomProdutoCadastro>
                            </div>
                            <div className={styles["responsividadeInputMedida"]}>
                                <Input
                                    label='Unidade de medida: *'
                                    placeholder='Selecione a medida'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={setUnidadeMedida}
                                    availableSelect={true}
                                    selectOptions={unidadeMedidaOptions}
                                    hasError={errors.unidadeMedida}>
                                </Input>
                            </div>
                        </div>
                        <div className={styles["inputsContainerLine2"]}>
                            <div className={styles["responsividadeInputMassa"]}>
                                <Input
                                    label='Massa:'
                                    placeholder='Insira o tipo de massa'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={setMassa}
                                    availableSelect={true}
                                    selectOptions={massaOptions}
                                    hasError={errors.massa}>
                                </Input>
                            </div>
                            <div className={styles["responsividadeInput50"]}>
                                <Input
                                    label='Cobertura:'
                                    placeholder='Insira o tipo de cobertura'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={setCobertura}
                                    availableSelect={true}
                                    selectOptions={coberturaOptions}
                                    hasError={errors.cobertura}>
                                </Input>
                            </div>
                        </div>
                        <div className={styles["inputsContainerLine3"]}>
                            <div className={styles["responsividadeInputRecheio"]}>
                                <Input
                                    label='Recheio:'
                                    placeholder='Selecione um recheio'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={handleRecheioChange}
                                    availableSelect={true}
                                    selectOptions={recheioOptions}
                                    hasError={errors.recheio}>
                                </Input>
                            </div>
                            <div className={styles["responsividadeInput50"]}>
                                <InputMaskCustomProdutoCadastro
                                    label='Preço do recheio:'
                                    id='precoCoberturaInput'
                                    width='100%'
                                    fieldWidth="100%"
                                    value={precoRecheio}
                                    onChange={setPrecoRecheio}
                                    hasError={errors.precoRecheio}
                                >
                                </InputMaskCustomProdutoCadastro>
                            </div>
                        </div>
                        <div className={styles["inputsContainerLine4"]}>
                            <div className={styles["responsividadeInputDescricao"]}>
                                <Input
                                    label='Descrição: *'
                                    placeholder='Insira a descrição do novo produto'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={setDescricao}
                                    hasError={errors.descricao}>
                                </Input>
                            </div>
                            <div className={styles["responsividadeInputTipo"]}>
                                <Input
                                    label='Tipo de produto: *'
                                    placeholder='Selecione o tipo'
                                    fieldWidth="100%"
                                    width='100%'
                                    onChange={setTipoProduto}
                                    availableSelect={true}
                                    selectOptions={tipoProdutoOptions}
                                    hasError={errors.tipoProduto}>
                                </Input>
                            </div>
                        </div>
                        <div className={styles["inputsContainerLine5"]}>
                            <div className={styles["buttonCadastro"]}>
                                <Button
                                    onClick={cadastramento}
                                    label='Cadastrar produto'
                                    icon='plus'
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

export default ProdutoCadastro;
