import React from "react";
import styles from './carrinho.module.css';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import Select from '../../components/Input/Select/select'
import ButtonOutlined from '../../components/Button/Default-variant/defaultv'
import ButtonFilled from '../../components/Button/Default/default'
import CardPedido from '../../components/CardRequest/cardRequest';

const Carrinho = () => {
    return (
        <div className={styles["mainContainer"]}>
            <Sidebar></Sidebar>
            <div className={styles["innerContainer"]}>
                <div className={styles["carrinhoBreadcrumbContainer"]}>
                    <Breadcrumb></Breadcrumb>
                </div>
                <div className={styles["carrinhoTittleCard"]}>
                    <h2>Carrinho</h2>
                    <p>Verifique os produtos e conclua o pedido</p>
                </div>
                <div className={styles["inputsContainer"]}>
                    <div className={styles["clientInfo"]}>
                        <div className={styles["clientName"]}>
                            <label>Cliente</label>
                            <input type="text" placeholder="Insira o nome" />
                        </div>
                        <div className={styles["clientNumber"]}>
                            <label>Número de telefone</label>
                            <input type="text" placeholder="Insira o número" />
                        </div>                        
                    </div>
                    <div className={styles["requestInfo"]}>
                        <Select
                            label="Forma de Pagamento:"
                            placeholder="Selecione uma opção"
                            width="29vw"
                            options={[
                                {
                                    label:'Cartão de Débito/Crédito',
                                    value:"card",
                                },
                                {
                                    label:'Dinheiro',
                                    value:"money",
                                },
                                {
                                    label:'Pix',
                                    value:"pix",
                                }
                            ]}
                        />

                        <div className={styles["deliveryDate"]}>
                            <label>Data de entrega:</label>
                            <input type="date"/>
                        </div>

                        <Select
                            label="Forma de entrega:"
                            placeholder="Selecione uma opção"
                            width="29vw"
                            options={[
                                {
                                    label:'Pronta entrega',
                                    value:"prontaEntrega",
                                },
                                {
                                    label:'Retirada',
                                    value:"retirada",
                                },
                                {
                                    label:'Serviço em festa',
                                    value:"festa",
                                }
                            ]}
                        />
                    </div>
                </div>
                <div className={styles["divisor"]}></div>
                <div className={styles["productsList"]}>
                    <h2>Lista de produtos</h2>
                    <div className={styles["cardsContainer"]}>
                        {/* <CardPedido></CardPedido> */}
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
    )
}

export default Carrinho;