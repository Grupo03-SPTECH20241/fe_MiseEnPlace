import React, { useState } from "react";
import styles from './carrinho.module.css';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import Select from '../../components/Input/Select/select';
import ButtonFilled from '../../components/Button/Default/default';
import CardPedido from '../../components/CardRequest/cardRequest';
import FotoTeste from '../../utils/img/Bolo-coco-1.png';
import InputCalendar from '../../components/Input/Calendar/calendar';
import InputText from '../../components/Input/Text/text';
// produto-pedido -> endpoint
const Carrinho = () => {

    const [formaEntrega, setFormaEntrega] = useState('festa');
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [dataEntrega, setDataEntrega] = useState(null);
    const [cep, setCep] = useState(null);
    const [logradouro, setLogradouro] = useState(null);


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
    }

    const handleLogradouroChange = (event) => {
        setLogradouro(event.target.value);
    }

    const imagem = FotoTeste;
    const nomeProduto = "Bolo de coco";
    const descricao = "Bolo bem bom de ccocococococooc";
    const qtd = 1;
    const valor = 23.07;

    return (
        <div className={styles["mainContainer"]}>
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
                        ></InputText>
                        <InputText
                            label="Número de telefone:"
                            placeholder="Insira o número"
                            width="43vw"
                        ></InputText>                 
                    </div>
                    <div className={styles["basic-oreder-details"]}>
                        <div className={styles["requestInfo"]}>
                            <Select
                                label="Forma de pagamento:"
                                value={formaPagamento}
                                options={[
                                    { label: 'PIX', value: 'pix' },
                                    { label: 'Catão de crédito', value: 'creditCard' },
                                    { label: 'Cartão de débito', value: 'debitCard' },
                                    { labe: 'Dinheiro vivo', value: 'money'}
                                ]}
                                onChange={handleFormaPagamentoChange}
                                width="53vh"
                            ></Select>

                            <InputCalendar
                                label="Data de entrega:"
                                onChange={handleDataEntregaChange}
                                value={dataEntrega}
                                width="53vh"
                            ></InputCalendar>
                            <Select
                                label="Forma de entrega:"
                                placeholder="Selecione uma opção"
                                width="53vh"
                                value={formaEntrega}
                                onChange={handleFormaEntregaChange}
                                options={[
                                    { label: 'Pronta entrega', value: 'prontaEntrega' },
                                    { label: 'Retirada', value: 'retirada' },
                                    { label: 'Serviço em festa', value: 'festa' }
                                ]}>
                            </Select>
                        </div>
                    </div>
                    {formaEntrega === 'festa' && (<div className={styles["party-container"]}>
                        <div className={styles["requestInfo"]}>
                            <InputText
                                label="CEP:"
                                placeholder="00000-000"
                                width="53vh"
                                value={cep}
                                onChange={handleCEPChange}
                            ></InputText>
                            <InputText
                                label="Logradouro:"
                                width="112vh"
                                value={logradouro}
                                onChange={handleLogradouroChange}
                            ></InputText>
                        </div>
                    </div>)}
                    {(formaEntrega === 'prontaEntrega' || formaEntrega === 'retirada') && (<div className={styles["ready-to-deliver-container"]}>
                        <div className={styles["requestInfo"]}>
                            <Select
                                label="Forma de entrega:"
                                placeholder="Selecione uma opção"
                                width="53vh"
                                value={formaEntrega}
                                onChange={handleFormaEntregaChange}
                                options={[
                                    { label: 'Pronta entrega', value: 'prontaEntrega' },
                                    { label: 'Retirada', value: 'retirada' },
                                    { label: 'Serviço em festa', value: 'festa' }
                                ]}
                            ></Select>

                            <InputCalendar 
                                type="date" 
                                label="data de entrega:"
                                width="53vh"
                            ></InputCalendar>

                            <Select
                                label="Forma de entrega:"
                                placeholder="Selecione uma opção"
                                width="53vh"
                                value={formaEntrega}
                                onChange={handleFormaEntregaChange}
                                options={[
                                    { label: 'Pronta entrega', value: 'prontaEntrega' },
                                    { label: 'Retirada', value: 'retirada' },
                                    { label: 'Serviço em festa', value: 'festa' }
                                ]}>
                            </Select>
                        </div>
                    </div>)}
                </div>
                <div className={styles["divisor"]}></div>
                <div className={styles["productsList"]}>
                    <h2>Lista de produtos</h2>
                    <div className={styles["cardsContainer"]}>
                        <CardPedido 
                            imagemSrc={imagem}
                            nomeProduto={nomeProduto}
                            descricao={descricao}
                            quantidade={qtd}
                            valor={valor}
                        />
                    </div>
                </div>
                <div className={styles["actions"]}>
                    <div className={styles["values"]}>
                        <p>Valor: R$ 23.07</p>
                        <p>Sinal: R$ 23.07</p>
                    </div>
                    <ButtonFilled 
                        label="Cadastrar pedido"
                        iconPosition="left"
                        width="215px"
                    />
                </div>
            </div>
        </div>
    );
};

export default Carrinho;
