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

const Carrinho = () => {
    // Estado para armazenar a forma de entrega selecionada
    const [formaEntrega, setFormaEntrega] = useState("");

    // Função para lidar com a mudança na seleção
    const handleFormaEntregaChange = (event) => {
        setFormaEntrega(event.target.value);
    };

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
                    <div className={styles["requestInfo"]}>
                    <Select
                        label="Forma de entrega:"
                        placeholder="Selecione uma opção"
                        width="29vw"
                        value={formaEntrega}
                        onChange={handleFormaEntregaChange}
                        options={[
                            { label: 'Pronta entrega', value: 'prontaEntrega' },
                            { label: 'Retirada', value: 'retirada' },
                            { label: 'Serviço em festa', value: 'festa' }
                        ]}
                    />
                </div>

                {formaEntrega === 'prontaEntrega' && (
                    <div className={styles["deliveryDate"]}>
                        <label>Data de entrega:</label>
                        <input type="date" />
                    </div>
                )}

                {formaEntrega === 'retirada' && (
                    <div className={styles["pickupInfo"]}>
                        <label>Endereço de Retirada:</label>
                        <input type="text" placeholder="Insira o endereço de retirada" />
                    </div>
                )}

                {formaEntrega === 'festa' && (
                    <div className={styles["partyInfo"]}>
                        <label>Data do Evento:</label>
                        <input type="date" />
                        <label>Local do Evento:</label>
                        <input type="text" placeholder="Insira o local do evento" />
                    </div>
                )}
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
