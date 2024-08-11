import Input from '../Input/Text/text';
import styles from './goalChartModal.module.css'
import exitIcon from '../../utils/img/exit_icon.png'
import ButtonFilledDefault from '../Button/Default/default';
import ButtonFilledNegative from '../Button/Cancelar/cancelar';

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
            <Input
                className={styles["inputs"]}
                label='Meta: '
                placeholder='R$'
                id='metaInput'
                widthInput='100%'
                >
            </Input>

            <Input
                label='Data fim:'
                placeholder='dd/MM/yyyy'
                widthInput='45%'>
            </Input>

            <div className={styles["modalButtons"]}>
                <ButtonFilledDefault
                    onClick={closeModal}
                    label='Cancelar'
                    showIcon={false}>
                </ButtonFilledDefault>
                <ButtonFilledNegative
                    label='Definir meta'
                    showIcon={false}>
                </ButtonFilledNegative>
            </div>
            
        </div>
    );
};

export default GoalChartModal;