import React, { useState, useEffect } from "react";  
import styles from './visualizarPedido.module.css';  
import Sidebar from '../../components/Sidebar/sidebar';  
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';  
import Select from '../../components/Input/Select/select';  
import BreadCrumbArrow from '../../utils/img/breadcrumb-return-arrow.png'
import PropTypes from 'prop-types';  
import ButtonOutlinedNegative from "../../components/Button/Cancelar-variant/cancelarv";
import ButtonFilledNegative from "../../components/Button/Cancelar/cancelar";
import CardPedido from '../../components/CardRequest/cardRequest';  
import { toast, ToastContainer } from 'react-toastify';
import InputCalendar from '../../components/Input/Calendar/calendar';  
import InputText from '../../components/Input/Text/text';  
import api from "../../api";  
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal"
import ExcluirPedidoModal from "../../components/ExcluirPedidoModal/excluirPedidoModal";
import AdicionarPedidoModal from "../../components/AdicionarPedidoModal/adicionarPedidoModal";
import ExcluirProdutoModal from "../../components/ModalExclusaoProdutoPedido/modalExclusaoProdutoPedido";

const customStyles = {
    content: {
      width: '60%',
      height: '65%',
      margin: 'auto',
      borderRadius: '20px',
      borderColor: 'gray'
    },
};


const VisualizarPedido = () => {
    // navegação
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToAgenda = () => {
        navigate('/agenda', {state: null});
    }

    // Modal de exclusão do pedido
    const [excluirPedidoModalIsOpen, setExcluirPedidoModalIsOpen] = useState(false);

    const openExcluirPedidoModal = (data) => {
        setExcluirPedidoModalIsOpen(true);
    }
    const closeExcluirPedidoModal = () => {
        setExcluirPedidoModalIsOpen(false)
    }

    // Modal de edição do produto

    const [editarProdutoModalIsOpen, setEditarProdutoModalIsOpen] = useState(false);
    const [excluirProdutoModalIsOpen, setExcluirProdutoModalIsOpen] = useState(false);
    const [produtoSendoEditado, setProdutoSendoEditado] = useState(null);
    const [idProdutoPedidoAtual, setidProdutoPedidoAtual] = useState(null);
    const [idClienteSelecionado, setIdClienteSelecionado] = useState(null);

    const handleEditarProduto = (idProdutoPedido, data) => {
        setProdutoSendoEditado(data);
        setidProdutoPedidoAtual(idProdutoPedido);
    }

    const openEditarProdutoModal = () => {
        setEditarProdutoModalIsOpen(true);
    }

    const closeEditarProdutoModal = () => {
        setEditarProdutoModalIsOpen(false);
    }

    // Modal de exclusão de produto

    const [proutoQueVaiSerExcluido, setProutoQueVaiSerExcluido] = useState(null);

    const handleExcluirProduto = async () => {
        try {
            await api.delete(`/produto-pedidos/${proutoQueVaiSerExcluido?.idProdutoPedido}`);
            toast.success('Produto excluído com sucesso', { theme: 'colored' });
            closeExcluirProdutoModal();
            fetchPedido();
        } catch (error) {
            toast.error('Não foi possível excluir esse produto.', { theme: 'colored' });
            console.log(error);
        }
    }

    const openExcluirProdutoModal = () => {
        setExcluirProdutoModalIsOpen(true);
    }

    const closeExcluirProdutoModal = () => {
        setExcluirProdutoModalIsOpen(false);
    }

    // dados do pedido selecionado
    const [pedido, setPedido] = useState( location.state?.pedido || []);
    const [produtos, setProdutos] = useState(null);
    const [idPedido, setIdPedido] = useState( location.state?.pedidoId || null);

    // valores selecionados nos inputs
    const [nomeCliente, setNomeCliente] = useState(null);
    const [numeroTelefone, setNumeroTelefone] = useState(null);
    const [formaEntrega, setFormaEntrega] = useState(null);  
    const [formaPagamento, setFormaPagamento] = useState(null);  
    const [dataEntrega, setDataEntrega] = useState(null);  
    const [cep, setCep] = useState(null);  
    const [logradouro, setLogradouro] = useState(null);  

    // opções de valores disponíveis para os inputs
    const [formaPagamentoOptions, setFormaPagamentoOptions] = useState([{id: '', value: ''}]);
    const [formaEntregaOptions, setFormaEntregaOptions] = useState([{id: '', value: ''}]);

    // clientes cadastrados no banco
    const [clientes, setClientes] = useState([]);

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                fetchFormaEntregaOptions();
                fetchFormaPagamentoOptions();
                fetchPedido();
                fetchClientes();
            } catch (error) {  
                console.error(error);  
            }  
        };  
        fetchData();  
    }, []);

    const fetchClientes = async () => {
        const response = await api.get('/clientes');  
        const { data } = response;
        setClientes(data);
    }

    // edição do pedido & validação do corpo p/requisição
    const editarPedido = async () => {
        let idNovoCliente = null;
        if(!idClienteSelecionado) {
            if(nomeCliente && numeroTelefone){
                const ClienteCriacaoDto = {
                    nome: nomeCliente,
                    numero: numeroTelefone,
                }
                const response = await api.post('/clientes', ClienteCriacaoDto);
                const { data } = response;
                idNovoCliente = data?.idCliente;
            }
        }

        if(validateBody()){
            try {
                const payload = {
                    dtPedido: dataEntrega,
                    vlPedido: pedido?.vlPedido,
                    status: pedido?.status ? pedido?.status : 'N',
                    valorSinal: pedido?.vlPedido ? pedido?.vlPedido/2 : 0,
                    formaEntregaId: formaEntrega,
                    clienteId: idClienteSelecionado ? idClienteSelecionado : idNovoCliente,
                    formaPagamentoId: formaPagamento
                };
                await api.put(`/pedidos/${pedido?.idPedido}`, payload);
                toast.success('Pedido atualizado com sucesso!', { theme: "colored" });
                setTimeout(()=>{
                    navigate("/dashboard")
                }, 6000);
            } catch (error) {
                console.log(error);
                toast.error('Erro ao editar pedido', { theme: "colored" });
            }
        } else {
            toast.error('Por favor, preencha todos os campos.', { theme: "colored" });
        }
    };

    const validateBody = () =>{
        if (nomeCliente && numeroTelefone && formaEntrega && formaPagamento && dataEntrega) {
            if(formaEntrega === 'Serviço Festa'){
                if(cep && logradouro){
                    return true
                } else {
                    return false
                }
            } 
            return true;
        }
        return false;
    }

    // busca das opções para os inputs
    const fetchFormaEntregaOptions = async () => {
        const response = await api.get('/forma-entregas');  
        const { data } = response;
        setFormaEntregaOptions(data.map((value) =>{
            return {
                label: value?.formaEntrega,
                value: value?.idFormaEntrega
            }
        }))
    }

    const fetchFormaPagamentoOptions = async () => {
        const response = await api.get('/forma-pagamento');  
        const { data } = response;
        setFormaPagamentoOptions(data.map((value) =>{
            return {
                label: value?.formaPagamento,
                value: value?.idFormaPagamento
            }
        }))
    }

    // busca os dados do pedido
    const fetchPedido = async () => {
        if(idPedido) {
            const response = await api.get(`/produto-pedidos/visualizar-pedido/${idPedido}`);  
            const { data } = response;
            setNomeCliente(data?.pedidoListagemDTO?.clienteDto?.nome);
            setNumeroTelefone(data?.pedidoListagemDTO?.clienteDto?.numero);
            setFormaEntrega(data?.pedidoListagemDTO?.formaEntregaDto?.idFormaEntrega);
            setDataEntrega(data?.pedidoListagemDTO?.dtEntrega);
            setFormaPagamento(data?.pedidoListagemDTO?.formaPagamentoDto?.idFormaPagamento);
            setPedido(data?.pedidoListagemDTO);
            setProdutos(data?.produtos);
        }
    }

    // Edita o produto do pedido
    const handleAtualizarProdutoPedido = async (produtoPedidoCriacaoDto) => {
        produtoPedidoCriacaoDto.pedidoId = pedido.idPedido;
        produtoPedidoCriacaoDto.qtProduto = Number(produtoPedidoCriacaoDto.qtProduto);

        try {
            await api.put(`/produto-pedidos/${idProdutoPedidoAtual}`, produtoPedidoCriacaoDto);  
            toast.success('Produto atualizado!', { theme: "colored" });

        } catch (e) {
            console.log(e);
        }

    };

    // handlers  
    const handleFormaPagamentoChange = (event) => {  
        setFormaPagamento(event?.target?.value ? event?.target?.value : event);  
    };  

    const handleFormaEntregaChange = (event) => {  
        setFormaEntrega(event?.target?.value ? event?.target?.value : event);
    };  

    const handleDataEntregaChange = (event) => {  
        setDataEntrega(event?.target?.value ? event?.target?.value : event);  
    };  

    const handleCEPChange = (event) => {  
        setCep(event?.target?.value ? event?.target?.value : event);  
    };  

    const handleLogradouroChange = (event) => {  
        setLogradouro(event?.target?.value ? event?.target?.value : event);  
    };  

    const handleNomeClienteChange = async (event) => {  
        const nomeClienteInformado = normalizeString(event?.target?.value ? event?.target?.value : event);
        let clienteEncontrado = false;
        for(let i = 0; i < clientes.length; i++){
            if(compareStrings(normalizeString(clientes[i]?.nome), nomeClienteInformado)){
                setIdClienteSelecionado(clientes[i]?.idCliente);
                clienteEncontrado = true;
                break;
            }
        }
        if (!clienteEncontrado) setIdClienteSelecionado(null);
        setNomeCliente(event?.target?.value ? event?.target?.value : event);  
    };  

    const handleNumeroTelefoneChange = (event) => {  
        setNumeroTelefone(event?.target?.value ? event?.target?.value : event);  
    };  

    const deletarPedido = async () => {
        try {
            try {
                await api.delete('/produto-pedidos/'+produtos?.idProdutoPedido);
            } catch (e) {
                console.log(e);
            }
            await api.delete('/pedidos/'+pedido?.idPedido);
            toast.success('Pedido Excluído com sucesso!', { theme: "colored" });
            closeExcluirPedidoModal();
            setTimeout(()=>{
                navigate('/agenda', {state: null});
            },6000);
        } catch (e){
            console.log(e);
        }
    }

    // funções auxiliares
    function normalizeString(str) { 
        if(!str.length) return '';
        return str  
            .normalize('NFD') // Normaliza a string para decompor caracteres acentuados  
            .replace(/[\u0300-\u036f]/g, '') // Remove os acentos  
            .toLowerCase(); // Converte para minúsculas  
    }  

    function compareStrings(str1, str2) {  
        const normalizedStr1 = normalizeString(str1);  
        const normalizedStr2 = normalizeString(str2);  
        
        return normalizedStr1.localeCompare(normalizedStr2) === 0; // Retorna true se as strings forem iguais  
    }  

    return (  
        <div className={styles["mainContainer"]}>  
            <ToastContainer />
            <Sidebar />  
            <div className={styles["innerContainer"]}>  
                <div className={styles["carrinhoBreadcrumbContainer"]}>  
                    <Breadcrumb />  
                    <div className={styles["returnArrowContainer"]}>
                        <div className={styles["imageContainer"]} onClick={navigateToAgenda}>
                            <img src={BreadCrumbArrow} alt="seta breadcrumb" />
                        </div>
                        <div className={styles["returnArrow"]} onClick={navigateToAgenda}>Voltar</div>
                    </div>
                </div>  
                <div className={styles["carrinhoTittleCard"]}>  
                    <h2>Pedido #{pedido?.idPedido? pedido.idPedido : '-'}</h2>  
                    <p>Estado atual: {pedido?.status === "N" ? "Novo" 
                        : pedido?.status === "P" ? "Preparando" 
                        : pedido?.status === "R" ? "Pronto" 
                        : pedido?.status === "F" ? "Fazendo" 
                        : pedido?.status === "E" ? "Entregue" 
                        : "N/A"
                    }</p> 
                </div>  
                <div className={styles["inputsContainer"]}>  
                    <div className={styles["clientInfo"]}>  
                        <InputText  
                            label="Cliente:"  
                            placeholder="Insira o nome do cliente"  
                            defaultValue={nomeCliente}
                            width="44vw"  
                            onChange={handleNomeClienteChange}
                        />  
                        <InputText  
                            label="Número de telefone:"  
                            placeholder="Insira o número"  
                            defaultValue={numeroTelefone}
                            width="43vw"  
                            onChange={handleNumeroTelefoneChange}
                        />                 
                    </div>  
                    <div className={styles["basic-oreder-details"]}>  
                        <div className={styles["requestInfo"]}>  
                            <Select  
                                label="Forma de pagamento:"  
                                value={formaPagamento}  
                                options={formaPagamentoOptions}  
                                defaultValue={formaPagamento}
                                onChange={handleFormaPagamentoChange}  
                                width="53vh"  
                            />  
                            <InputCalendar  
                                label="Data de entrega:"  
                                onChange={handleDataEntregaChange}  
                                value={dataEntrega}  
                                defaultValue={dataEntrega}
                                width="53vh"  
                            />  
                            <Select  
                                label="Forma de entrega:"  
                                placeholder="Selecione uma opção"  
                                width="53vh"  
                                value={formaEntrega}  
                                onChange={handleFormaEntregaChange}  
                                options={formaEntregaOptions}
                                defaultValue={formaEntrega}>  
                            </Select>  
                        </div>  
                    </div>  
                    {formaEntrega === '3' && (  
                        <div className={styles["party-container"]}>  
                            <div className={styles["requestInfo"]}>  
                                <InputText  
                                    label="CEP:"  
                                    placeholder="00000-000"  
                                    width="53vh"  
                                    value={cep}  
                                    onChange={handleCEPChange}  
                                />  
                                <InputText  
                                    label="Logradouro:"  
                                    width="112vh"  
                                    value={logradouro}  
                                    onChange={handleLogradouroChange}  
                                />  
                            </div>  
                        </div>  
                    )}  
                </div>  
                <div className={styles["divisor"]}></div>  
                <div className={styles["productsList"]}>  
                    <h2>Lista de produtos</h2>  
                    <div className={styles["cardsContainer"]}>  
                    { produtos && produtos.map((data, index) => (
                        <CardPedido   
                            key={`pedido-${index}`}
                            imagemSrc={data?.produtoDto?.foto}  
                            nomeProduto={data?.produtoDto?.nome}  
                            descricao={data?.produtoDto?.descricao}  
                            quantidade={data?.qtdProduto}  
                            valor={data?.produtoDto?.preco}  
                            onEdit={()=>{handleEditarProduto(data?.idProdutoPedido, data); openEditarProdutoModal()}}
                            onDelete={()=>{setProutoQueVaiSerExcluido(data); openExcluirProdutoModal()}}
                        />  
                    ))}
                    </div>  
                </div>  
                <div className={styles["pedidos-footer"]}>
                    <div className={styles["buttons-container"]}>
                        <div className={styles["buttons"]}>
                            <ButtonFilledNegative
                                label="Excluir pedido"
                                iconPosition="left"
                                onClick={openExcluirPedidoModal}
                                icon="delete"
                                width="160px"
                            ></ButtonFilledNegative>
                            <ButtonOutlinedNegative
                                label="Editar pedido"
                                onClick={editarPedido}
                                iconPosition="left"
                                icon="edit"
                                width="150px"
                            ></ButtonOutlinedNegative>
                        </div>
                    </div>
                    <div className={styles["actions-container"]}>
                        <div className={styles["actions"]}>  
                            <div className={styles["values"]}>  
                                <p>Valor: R${pedido?.vlPedido ? pedido.vlPedido:'-'}</p>  
                                <p>Sinal: R${pedido?.valorSinal ? pedido.vlPedido/2:'-'}</p>  
                            </div>
                        </div>  
                    </div>
                </div>
            </div>  
            <Modal style={customStyles} isOpen={excluirPedidoModalIsOpen}>
                <ExcluirPedidoModal
                    pedido={pedido}
                    closeModal={closeExcluirPedidoModal}
                    onConfirm={deletarPedido}
                ></ExcluirPedidoModal>
            </Modal>
            <Modal style={customStyles} isOpen={editarProdutoModalIsOpen}>
                <AdicionarPedidoModal
                    produto={produtoSendoEditado?.produtoDto}
                    isEditing={true}
                    qtdProduto={produtoSendoEditado?.qtdProduto}
                    idProdutoPedido={produtoSendoEditado?.idProdutoPedido}
                    closeModal={closeEditarProdutoModal}
                    onConfirm={handleAtualizarProdutoPedido}
                ></AdicionarPedidoModal>
            </Modal>
            <Modal style={customStyles} isOpen={excluirProdutoModalIsOpen}>
                <ExcluirProdutoModal
                    closeModal={closeExcluirProdutoModal}
                    onConfirm={handleExcluirProduto}
                    produto={proutoQueVaiSerExcluido}
                ></ExcluirProdutoModal>
            </Modal>
        </div>  
    );  
};  

ButtonOutlinedNegative.propTypes = {  
    idPedido: PropTypes.number,  
  };  

export default VisualizarPedido;