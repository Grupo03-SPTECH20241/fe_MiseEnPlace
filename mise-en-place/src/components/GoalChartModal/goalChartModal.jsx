import styles from './goalChartModal.module.css'
import exitIcon from '../../utils/img/exit_icon.png'
import ButtonFilledDefault from '../Button/Default/default';
import ButtonFilledNegative from '../Button/Cancelar/cancelar';
import InputMaskCustom from '../Input/InputMask/inputMaskCustom';
import api from '../../../src/api';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 

const GoalChartModal = ({closeModal}) => {
    const [metaValue, setMetaValue] = useState(null);
    const [dataFimDefault, setDataFimDefault] = useState(null);
    const [dataFim, setDataFim] = useState(null);
    const [dataInicio, setDataInicio] = useState(null);
    const [atualizarDataInicio, setAtualizarDataInicio] = useState(false);
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {  
        getDataInicial();
    });  

    const handleMetaChange = (event) => {
        setMetaValue(event.target.value);
    }

    const handleDataFimChange = (event) => {
        setDataFim(event.target.value);
    }

    const getDataInicial = async () => {
        const response = await api.get('/metas');
        const { data } = response;

        const inicio = new Date(data.dtInicio);  
        const fim = new Date(data.dtTermino);  
        const atual = new Date();

        if ((atual >= inicio && atual <= fim) && (data.dtInicio && data.dtTermino)) {
            setDataInicio(formatarData(inicio));
            setAtualizarDataInicio(false);
        }  else {
            setDataInicio(formatarData(atual));
            setAtualizarDataInicio(true);
        }
        setDataFimDefault(formatarData(fim));
    }

    const cadastrarMeta = async () => {

        if(isSaving) return;
        if(!metaValue || !dataFim && !dataFimDefault) {
            toast.error('Por favor, informe o valor da meta e data de término.', { theme: 'colored' });
            return;
        }
        const payload = {
            valor: convertCurrencyStringToNumber(metaValue),
            dtTermino: formatarDataPayload(dataFim ? dataFim : dataFimDefault),
        }
        
        try {
            setIsSaving(true);
            await api.put(`/metas/${1}/in-range/${atualizarDataInicio}`, payload);

            if (atualizarDataInicio){
                toast.success('Meta atualizada com sucesso', { theme: 'colored' });
            } else {
                toast.success('Nova meta cadastrada com sucesso', { theme: 'colored' })
            }
        } catch (e){
            console.log(e);
        } finally {
            setTimeout(()=>{
                setIsSaving(false);
                closeModal();
            },7000);
        }
    }

    const formatarData = (data) => {  
        const dia = String(data.getDate()).padStart(2, '0');  
        const mes = String(data.getMonth() + 1).padStart(2, '0'); 
        const ano = data.getFullYear();  
        return `${dia}/${mes}/${ano}`;  
    }; 

    const formatarDataPayload = (data) => {  
        const partes = data.split("/");  
        return `${partes[2]}-${partes[1]}-${partes[0]}`;  
      };  

    const convertCurrencyStringToNumber = (currencyString) => {  
        let cleanedString = currencyString.replace(/R\$|\s/g, '');  
        cleanedString = cleanedString.replace(/\./g, '');  
        cleanedString = cleanedString.replace(',', '.');  
        const numericValue = parseFloat(cleanedString);  
        
        return numericValue;  
    }  

    const exit = () => {
        if (!isSaving) closeModal();
    }

    return (
        <div>
            <ToastContainer />
            <div className={styles["goalChartModalHeader"]}>
                <span className={styles["modalTitle"]}>Configurar meta</span>
                <img
                    src={exitIcon}
                    onClick={exit}
                    className={styles["exitButton"]}
                    />
            </div>
            <hr />
            <InputMaskCustom
                className={styles["inputs"]}
                label='Meta: '
                placeholder='R$'
                id='metaInput'
                width='100%'
                mask="R$ 999999"
                maskChar={null}
                onChange={handleMetaChange}
                >
            </InputMaskCustom>

            <div className={styles["dateInputs"]}>
                <InputMaskCustom
                    type="date"
                    fieldWidth='48%'
                    width='100%'
                    label='Data início:'
                    mask="99/99/9999"
                    placeholder="DD/MM/YYYY"
                    maskChar={null}
                    defaultValue={dataInicio}
                    isDisabled={true}
                    >
                </InputMaskCustom>
                <InputMaskCustom
                    type="date"
                    fieldWidth='48%'
                    width='100%'
                    label='Data fim:'
                    mask="99/99/9999"
                    placeholder="DD/MM/YYYY"
                    maskChar={null}
                    defaultValue={dataFimDefault}
                    onChange={handleDataFimChange}
                    >
                </InputMaskCustom>
            </div>

            <div className={styles["modalButtons"]}>
                <ButtonFilledNegative
                    onClick={exit}
                    label='Cancelar'
                    showIcon={false}
                    >
                </ButtonFilledNegative>
                <ButtonFilledDefault
                    icon='check'
                    label='Definir meta'
                    showIcon={true}
                    iconPosition='left'
                    width='180px'
                    onClick={cadastrarMeta}
                    >
                </ButtonFilledDefault>
            </div>
            
        </div>
    );
};

export default GoalChartModal;