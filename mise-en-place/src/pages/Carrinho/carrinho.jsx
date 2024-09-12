import React, { useState, useEffect } from "react";  
import styles from './carrinho.module.css';  
import Sidebar from '../../components/Sidebar/sidebar';  
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';  
import Select from '../../components/Input/Select/select';  
import ButtonFilledDefault from '../../components/Button/Default/default';  
import ButtonFilledDefaultVariant from "../../components/Button/Default-variant/defaultv";
import BoloChocolate from '../../utils/img/produtos/bolo_chocolate.jpg';
import CardPedido from '../../components/CardRequest/cardRequest';  
import { toast, ToastContainer } from 'react-toastify';
import InputCalendar from '../../components/Input/Calendar/calendar';  
import InputText from '../../components/Input/Text/text';  
import api from "../../api";  
import { useNavigate, useLocation } from "react-router-dom";

const Carrinho = () => {
    // navegação & recuperação de dados da tela anterior
    const location = useLocation();  
    const produtos = location.state?.produtos || [];  
    const produtoPedidoCriacaoDtos = location.state?.produtoPedidoCriacaoDtos || [];
    const navigate = useNavigate();  

    const voltarParaTelaOrigem = () => {  
        navigate('/adicionar-pedido', { state: { produtos, produtoPedidoCriacaoDtos } });  
    };  
    
    // Informações auxiliares para a criação do pedido
    const [clientes, setClientes] = useState([]);
    const [idClienteSelecionado, setIdClienteSelecionado] = useState(null);
    const [dataAtual, setDataAtual] = useState(new Date());

    // valores a serem exibidos na tela referente ao valor do pedido
    const [valorTotal, setValorTotal] = useState(0);
    const [valorSinal, setValorSinal] = useState(0);

    // valores selecionados nos inputs
    const [produtosCarrinho, setProdutosCarrinho] = useState(null);
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
                fetchFormaEntregaOptions();
                fetchFormaPagamentoOptions();
                fetchProdutosSelecionados();
                fetchClientes();
                fetchDataAtual();
                console.log("produtoPedidoCriacaoDtos")
                console.log(produtoPedidoCriacaoDtos)
                console.log("produtos")
                console.log(produtos)
                console.log("produtosCarrinho");
                console.log(produtosCarrinho);
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
                const pedidoCriacaoDTO = {
                    dtPedido: dataEntrega,
                    vlPedido: valorTotal,
                    status: 'N',
                    valorSinal: valorTotal,
                    formaEntregaId: formaEntrega,
                    clienteId: idClienteSelecionado,
                    formaPagamentoId: formaPagamento,
                    dtEntrega: dataEntrega,
                };

                const responsePedidoCriacao = await api.post('/pedidos', pedidoCriacaoDTO);
                for(let i = 0; i < produtoPedidoCriacaoDtos.length; i++){
                    let produtoPedidoCriacaoDto = {
                        qtProduto: produtoPedidoCriacaoDtos[i]?.qtProduto,
                        observacoes: produtoPedidoCriacaoDtos[i]?.observacoes,
                        produtoId: produtoPedidoCriacaoDtos[i]?.produtoId,
                        personalizacaoId: null,
                        pedidoId: responsePedidoCriacao?.data?.idPedido,
                    };
                    await api.post('/produto-pedidos', produtoPedidoCriacaoDto);
                }

                toast.success('Pedido cadastrado com sucesso!', { theme: "colored" });
                setTimeout(()=>{
                    navigate("/agenda");
                }, 6000);
            } catch (error) {
                console.log(error);
                toast.error('Erro ao cadastrar pedido', { theme: "colored" });
            }
        }
    };

    const validateBody = () =>{
        if (!idClienteSelecionado){
            toast.error('Nenhum cliente encontrado com esse nome.', { theme: "colored" });
            return false;
        }
        if (nomeCliente && numeroTelefone && formaEntrega && formaPagamento && dataEntrega) {
            if(formaEntrega === '3'){
                if(cep && logradouro){
                    return true
                } else {
                    toast.error('Por favor, preencha todos os campos.', { theme: "colored" });
                    return false
                }
            } 
            return true;
        }
        toast.error('Por favor, preencha todos os campos.', { theme: "colored" });
        return false;
    }

    // busca dos valores auxiliares
    const fetchClientes = async () => {
        const response = await api.get('/clientes');  
        const { data } = response;
        setClientes(data);
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

    const fetchDataAtual = () => {
        const agora = new Date();  
        const ano = agora.getFullYear();  
        const mes = String(agora.getMonth() + 1).padStart(2, '0');
        const dia = String(agora.getDate()).padStart(2, '0');  
    
        setDataAtual(`${ano}-${mes}-${dia}`); 
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

    const fetchProdutosSelecionados = async () => {
        const response = await api.get('/produtos');  
        const { data } = response;
        let produtosPreviamenteSelecionados = [];
        let valorTotal = 0;

        for(let i = 0; i < produtos.length; i++){
            for(let j = 0; j < data.length; j++){
                if(produtos[i]?.id === data[j].id){
                    produtosPreviamenteSelecionados.push(data[j]);
                    valorTotal += data[j].preco;
                }
            }
        }
        setProdutosCarrinho(produtosPreviamenteSelecionados);
        setValorTotal(valorTotal);
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
        const nomeClienteInformado = normalizeString(event.target.value);
        for(let i = 0; i < clientes.length; i++){
            if(compareStrings(normalizeString(clientes[i]?.nome), nomeClienteInformado)){
                setIdClienteSelecionado(clientes[i]?.idCliente);
                break;
            }
        }
        setNomeCliente(event.target.value);  
    };  

    const handleNumeroTelefoneChange = (event) => {  
        setNumeroTelefone(event.target.value);  
    };  

    const imagem = BoloChocolate;
    const qtd = 1;

    // funções de validação
    function normalizeString(str) {  
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
                </div>  
                <div className={styles["carrinhoTittleCard"]}>  
                    <h2>Carrinho</h2>  
                    <p>Verifique os produtos e conclua o pedido</p>  
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
                    { produtosCarrinho && produtosCarrinho.map((data, index) => (
                        <CardPedido   
                            key={`pedido-${index}`}
                            imagemSrc={data?.foto}  
                            nomeProduto={data?.nome}  
                            descricao={produtoPedidoCriacaoDtos[index]?.observacoes ? produtoPedidoCriacaoDtos[index]?.observacoes : data?.observacoes}  
                            quantidade={produtoPedidoCriacaoDtos[index]?.qtProduto ? produtoPedidoCriacaoDtos[index]?.qtProduto : data?.qtProduto}  
                            valor={data?.preco}  
                        />  
                    ))}
                    </div>  
                </div>  

                <div className={styles["carrinhoFooter"]}>
                    <div className={styles["return"]}>
                        <ButtonFilledDefaultVariant
                            label="< Voltar"
                            onClick={voltarParaTelaOrigem}
                            showIcon={false}
                        ></ButtonFilledDefaultVariant>
                    </div>
                    <div className={styles["actions"]}>  
                        <div className={styles["values"]}>  
                            <p>Valor: R${valorTotal ? valorTotal : '0'}</p>  
                            <p>Sinal: R${valorTotal ? valorTotal/2 : '0'}</p>  
                        </div>  
                        <ButtonFilledDefault   
                            label="Cadastrar pedido"  
                            iconPosition="left"  
                            width="215px"  
                            onClick={adicionarPedido}
                        />  
                    </div>  
                </div>
            </div>  
        </div>  
    );  
};  

export default Carrinho;

