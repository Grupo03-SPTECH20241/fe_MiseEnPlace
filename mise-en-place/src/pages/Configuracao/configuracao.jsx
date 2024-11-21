import { ToastContainer } from 'react-toastify';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './configuracao.module.css';

const Configuracao = () => {
    return  (
        <div className={styles["mainContainer"]}>
            <ToastContainer />
            <Sidebar />
            <div className={styles["innerContainer"]}>

            </div>
            <div className={styles["breadCrumbsContainer"]}>
                <Breadcrumb />
            </div>

            <div className={styles["produtoCadastroTittleCard"]}>
                <h2>Cadastrar produto</h2>
                <p>Cadastre um novo produtinho para os seus clientes.</p>
            </div>
        </div>
    );
};

export default Configuracao;