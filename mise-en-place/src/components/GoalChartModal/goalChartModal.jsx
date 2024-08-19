import styles from './goalChartModal.module.css'
import exitIcon from '../../utils/img/exit_icon.png'
import ButtonFilledDefault from '../Button/Default/default';
import ButtonFilledNegative from '../Button/Cancelar/cancelar';
import InputMaskCustom from '../Input/InputMask/inputMaskCustom';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 

const GoalChartModal = ({closeModal}) => {
    return (
        <div>
            <div className={styles["goalChartModalHeader"]}>
                <span className={styles["modalTitle"]}>Configurar meta</span>
                <img
                    src={exitIcon}
                    onClick={closeModal}
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
                mask="R$ 99999999999"
                maskChar={null}
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
                    >
                </InputMaskCustom>
            </div>

            <div className={styles["modalButtons"]}>
                <ButtonFilledNegative
                    onClick={closeModal}
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
                    >
                </ButtonFilledDefault>
            </div>
            
        </div>
    );
};

export default GoalChartModal;