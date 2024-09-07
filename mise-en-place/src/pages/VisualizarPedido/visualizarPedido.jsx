import React, { useState, useEffect } from "react";  
import styles from './visualizarPedido.module.css';  
import Sidebar from '../../components/Sidebar/sidebar';  
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';  
import Select from '../../components/Input/Select/select';  
import ButtonFilled from '../../components/Button/Default/default';  
import PropTypes from 'prop-types';  
import ButtonOutlinedNegative from "../../components/Button/Cancelar-variant/cancelarv";
import ButtonFilledNegative from "../../components/Button/Cancelar/cancelar";
import BoloChocolate from '../../utils/img/produtos/bolo_chocolate.jpg';
import CardPedido from '../../components/CardRequest/cardRequest';  
import { toast, ToastContainer } from 'react-toastify';
import InputCalendar from '../../components/Input/Calendar/calendar';  
import InputText from '../../components/Input/Text/text';  
import api from "../../api";  
import { useNavigate } from "react-router-dom";

const VisualizarPedido = ( {idPedido = 1} ) => {
    // navegação
    const navigate = useNavigate();

    // dita se a tela está em modo de edição
    const [isEditando, setIsEditando] = useState(false);

    // dados do pedido selecionado
    const [pedido, setPedido] = useState(null);
    
    // valores selecionados nos inputs
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);
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

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                fetchPedido();
                fetchFormaEntregaOptions();
                fetchFormaPagamentoOptions();
            } catch (error) {  
                console.error(error);  
            }  
        };  
        fetchData();  
    }, []);

    // criação do pedido & validação do corpo p/requisição
    const adicionarPedido = async () => {
        if(validateBody()){
            try {
                const payload = {
                    dtPedido: dataEntrega,
                    vlPedido: 30.0,
                    status: 'N',
                    valorSinal: 30.0,
                    formaEntregaId: formaEntrega,
                    clienteId: 1,
                    formaPagamentoId: formaPagamento
                };
                await api.post('/pedidos', payload);
                toast.success('Pedido cadastrado com sucesso!', { theme: "colored" });
                setTimeout(()=>{
                    navigate("/dashboard")
                }, 6000);
            } catch (error) {
                console.log(error);
                toast.error('Erro ao cadastrar pedido', { theme: "colored" });
            }
        } else {
            toast.error('Por favor, preencha todos os campos.', { theme: "colored" });
        }
    };

    const validateBody = () =>{
        if (nomeCliente && numeroTelefone && formaEntrega && formaPagamento && dataEntrega) {
            alert(formaEntrega)
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
        const response = await api.get('/pedidos');
        const { data } = response;
        
        console.log("pedidos:");
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i]?.idPedido === idPedido) {
                console.log("pedidoAtual:");
                console.log(data[i]);
                setPedido(data[i]);
                break;
            }
        }

    }

    // handlers  
    const handleFormaPagamentoChange = (event) => {  
        setFormaPagamento(event.target.value);  
    };  

    const handleFormaEntregaChange = (event) => {  
        setFormaEntrega(event.target.value);
    };  

    const handleDataEntregaChange = (event) => {  
        setDataEntrega(event.target.value);  
    };  

    const handleCEPChange = (event) => {  
        setCep(event.target.value);  
    };  

    const handleLogradouroChange = (event) => {  
        setLogradouro(event.target.value);  
    };  

    const handleNomeClienteChange = (event) => {  
        setNomeCliente(event.target.value);  
    };  

    const handleNumeroTelefoneChange = (event) => {  
        setNumeroTelefone(event.target.value);  
    };  

    const imagem = BoloChocolate;
    const qtd = 1;

    return (  
        <div className={styles["mainContainer"]}>  
            <ToastContainer />
            <Sidebar />  
            <div className={styles["innerContainer"]}>  
                <div className={styles["carrinhoBreadcrumbContainer"]}>  
                    <Breadcrumb />  
                </div>  
                <div className={styles["carrinhoTittleCard"]}>  
                    <h2>Pedido #{pedido?.idPedido? pedido.idPedido : '-'}</h2>  
                    <p>Estado atual: {pedido?.status? pedido.status : '-'}</p>  
                </div>  
                <div className={styles["inputsContainer"]}>  
                    <div className={styles["clientInfo"]}>  
                        <InputText  
                            label="Cliente:"  
                            placeholder="Insira o nome do cliente"  
                            width="44vw"  
                            onChange={handleNomeClienteChange}
                        />  
                        <InputText  
                            label="Número de telefone:"  
                            placeholder="Insira o número"  
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
                                onChange={handleFormaPagamentoChange}  
                                width="53vh"  
                            />  
                            <InputCalendar  
                                label="Data de entrega:"  
                                onChange={handleDataEntregaChange}  
                                value={dataEntrega}  
                                width="53vh"  
                            />  
                            <Select  
                                label="Forma de entrega:"  
                                placeholder="Selecione uma opção"  
                                width="53vh"  
                                value={formaEntrega}  
                                onChange={handleFormaEntregaChange}  
                                options={formaEntregaOptions}>  
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
                    { false && produtosCarrinho.map((data, index) => (
                        <CardPedido   
                            key={`pedido-${index}`}
                            imagemSrc={imagem}  
                            nomeProduto={data?.nome}  
                            descricao={data?.descricao}  
                            quantidade={qtd}  
                            valor={data?.preco}  
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
                                icon="delete"
                                width="160px"
                            ></ButtonFilledNegative>
                            <ButtonOutlinedNegative
                                label="Editar pedido"
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
                                <p>Sinal: R${pedido?.valorSinal ? pedido.vlPedido:'-'}</p>  
                            </div>
                        </div>  
                    </div>
                </div>
            </div>  
        </div>  
    );  
};  

ButtonOutlinedNegative.propTypes = {  
    idPedido: PropTypes.number,  
  };  

export default VisualizarPedido;