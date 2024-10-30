import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './produto.module.css';
import Button from '../../components/Button/Product/product';
import DefaultButton from '../../components/Button/Default/default';
import InputSearch from '../../components/Input/SearchProduct/searchProduct';
import { toast, ToastContainer } from 'react-toastify';
import Filter from '../../components/Filter/filter';
import CardProduct from '../../components/CardProduct/CardProduct';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>

const Produtos = () => {
    const [cardsData, setCardsData] = useState([]);
    const [filteredCardsData, setFilteredCardsData] = useState([]);
    const [value, setValue] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataDrop();
        fetchData();
    }, []);

    const fetchDataDrop = () => {
        api.get('/tipo-produtos').then((response) => {
            response.data.unshift({ nome: 'Todos' });
            setValue(response.data.map((item) => item.nome));
        }).catch((error) => {
            console.error(error);
            toast.error('Erro ao carregar tipos de produtos!', { theme: "colored" });
        });
    };

    const fetchData = () => {
        api.get('/produtos').then((response) => {
            setCardsData(response.data);
            setFilteredCardsData(response.data);
        }).catch((error) => {
            console.error(error);
            toast.error('Erro ao carregar produtos!', { theme: "colored" });
        });
    };

    const handleChange = (value) => {
        if (value === 'Todos') {
            setFilteredCardsData(cardsData);
        } else {
            api.get(`/produtos/filtrar-tipo/${value}`).then((response) => {
                setValue(response.data.map((item) => item.nome));
                setFilteredCardsData(response.data);
                fetchDataDrop();
            }).catch((error) => {
                console.error(error);
                toast.error('Erro ao filtrar produtos!', { theme: "colored" });
            });
        }
    };

    const teste = () => {
        const element = document.getElementById('input');
        const searchValue = element.value.toLowerCase();
        const newCardsData = cardsData.filter((data) => data.nome.toLowerCase().includes(searchValue));
        setFilteredCardsData(newCardsData);
    };

    // Função para exportar produtos
    const fetchExportarProdutos = async () => {
        try {
            const response = await api.get('/txt/export', { responseType: 'blob' });
            if (response.status === 200) {
                const blob = new Blob([response.data], { type: 'application/octet-stream' });
                const downloadUrl = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'produtos-exportados.txt');
                document.body.appendChild(link);
                link.click();

                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);

                toast.success('Arquivo exportado com sucesso!', { theme: "colored" });
            } else {
                toast.error('Erro na exportação dos produtos: ' + response.statusText, { theme: "colored" });
            }
        } catch (error) {
            console.error('Erro na exportação:', error);
            toast.error('Erro na exportação dos produtos!', { theme: "colored" });
        }
    };

    // Função para importar produtos
    const fetchImportarProdutos = async (file) => {
        if (!file) {
            toast.error('Nenhum arquivo selecionado!', { theme: "colored" });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/txt/import', {
                multipartFile: file
            },{
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                toast.success('Produtos importados com sucesso!', { theme: "colored" });
                fetchData(); // Atualiza a lista de produtos
            } else {
                const errorMessage = response.data?.message || response.statusText || 'Erro desconhecido';
                toast.error('Erro na importação dos produtos: ' + errorMessage, { theme: "colored" });
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error('Erro na importação dos produtos!', { theme: "colored" });
        }
    };

    return (
        <div className={styles["mainContainer"]}>
            <Sidebar />
            <div className={styles["innerContainer"]}>
                <div className={styles["produtoBreadcrumbsContainer"]}>
                    <Breadcrumb></Breadcrumb>
                </div>
                <div className={styles["containerTittleCard"]}>
                    <div className={styles["dashboardTittleCard"]}>
                        <h2>Produtos</h2>
                        <p>Lista de todos os produtos cadastrados no sistema.</p>
                    </div>
                </div>
                <div className={styles["innerContainerSearch"]}>
                    <div className={styles["containerButton"]}>
                        <DefaultButton
                            onClick={()=>{navigate('/produto-cadastro')}}
                            label='Cadastrar novo produto'
                            width='100%'
                            iconPosition='left'
                        ></DefaultButton>
                    </div>
                    <div className={styles["exportButtons"]}>
                        <DefaultButton 
                            onClick={fetchExportarProdutos} 
                            label="Exportar Produtos"
                            showIcon={false}
                        ></DefaultButton>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                if (e.target.files.length > 0) {
                                    fetchImportarProdutos(e.target.files[0]);
                                }
                            }}
                        />
                        <DefaultButton 
                            onClick={() => document.getElementById('fileInput').click()} 
                            label="Importar Produtos"
                            showIcon={false}
                        ></DefaultButton>
                    </div>
                    <div className={styles["containerInputs"]}>
                        <InputSearch
                            id='input'
                            onKeyUp={teste}
                        ></InputSearch>

                        <Filter options={value ? value : ['']}
                            onChange={handleChange}
                        ></Filter>
                    </div>
                </div>

                <div className={styles["content-musicas"]}>
                    {
                        filteredCardsData && filteredCardsData.map((data, index) => (
                            <CardProduct
                                key={index}
                                descricao={data.descricao}
                                nomeBolo={data.nome}
                                imagemSrc={data.foto}
                                valor={data.preco}
                                produto={data}
                            ></CardProduct>
                        ))
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Produtos;
