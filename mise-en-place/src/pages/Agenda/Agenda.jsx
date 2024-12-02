import React, { useEffect, useState } from "react";
import NestedList from "../../components/NestedList/NestedList";
import styles from "./agenda.module.css";
import Sidebar from "../../components/Sidebar/sidebar";
import Breadcrumb from "../../components/Texts/Breadcrumbs/breadcrumbs";
import Filter from "../../components/Filter/filter";
import IconKanban from '../../utils/img/Kanban.svg';
import IconAgenda from '../../utils/img/List.svg';
import api from "../../api";
import ButtonDefault from '../../components/Button/Default/default';
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const Agenda = () => {
  const [filterSelectedValue, setFilterSelectedValue] = useState('Mensal');
  const [testeMap, setTesteMap] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [stringUrlGeneral, setStringUrlGeneral] = useState('');

  const handleFilterStatus = (value) => {
    setFilterSelectedValue(value);
    fetchAgenda(value);
  }

  const fetchAgenda = async (item) => {
    setTesteMap([]);
    try {
      var stringUrl = "";
      if (item === 'Semanal') {
        function startOfWeek(date) {
          var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
          return new Date(date.setDate(diff));
        }

        var dt = new Date();

        stringUrl = 'produto-pedidos/agenda?dataInicio=';
        stringUrl += startOfWeek(dt).getDate() < 10 ? "0" + startOfWeek(dt).getDate() : startOfWeek(dt).getDate()
        stringUrl += "%2F"
        stringUrl += (startOfWeek(dt).getMonth() + 1) < 10 ? "0" + (startOfWeek(dt).getMonth() + 1) : (startOfWeek(dt).getMonth() + 1)
        stringUrl += "%2F"
        stringUrl += startOfWeek(dt).getFullYear().toString()
        stringUrl += "&dataFim="
        stringUrl += (startOfWeek(dt).getDate() + 6) < 10 ? "0" + (startOfWeek(dt).getDate() + 6) : (startOfWeek(dt).getDate() + 6)
        stringUrl += "%2F"
        stringUrl += (startOfWeek(dt).getMonth() + 1) < 10 ? "0" + (startOfWeek(dt).getMonth() + 1) : (startOfWeek(dt).getMonth() + 1)
        stringUrl += "%2F"
        stringUrl += startOfWeek(dt).getFullYear();
        setStringUrlGeneral(stringUrl);

      } else {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);

        stringUrl = "/java-api/produto-pedidos/agenda?dataInicio=";
        stringUrl += firstDay.getDate() < 10 ? "0" + firstDay.getDate().toString() : firstDay.getDate();
        stringUrl += "%2F";
        stringUrl += (firstDay.getMonth() + 1) < 10 ? "0" + (firstDay.getMonth() + 1) : firstDay.getMonth() + 1;
        stringUrl += "%2F";
        stringUrl += firstDay.getFullYear();
        stringUrl += "&dataFim=";
        stringUrl += lastDay.getDate() < 10 ? "0" + lastDay.getDate() : lastDay.getDate();
        stringUrl += "%2F";
        stringUrl += (lastDay.getMonth() + 1) < 10 ? "0" + (lastDay.getMonth() + 1) : lastDay.getMonth() + 1;
        stringUrl += "%2F";
        stringUrl += lastDay.getFullYear();
        setStringUrlGeneral(stringUrl);
      }
      api.get(stringUrl).then((response) => {
        const data = response.data;
        setTesteMap(data.itemsAgenda);
      }).catch((error) => {
        console.error("Erro ao buscar dados da agenda", error);
      });
    } catch (error) {
      console.error("Erro ao buscar dados da agenda", error);
    }
  };

  useEffect(() => {
    fetchAgenda();
  }, []);

  const fetchExportarPedidos = async () => {
    try {
      const urlExportarPedidos = stringUrlGeneral.replace("/java-api/produto-pedidos/agenda?", "/java-api/produto-pedidos/exportar-pedidos?");

      const response = await api.get(urlExportarPedidos, { responseType: 'blob' });

      if (response.status === 200) {

        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'pedidos-exportados.csv');
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);

        toast.success('Arquivo exportado com sucesso!', { theme: "colored" });
      } else {
        toast.error('Erro na exportação dos pedidos: ' + response.statusText, { theme: "colored" })
      }
    } catch (error) {
      toast.error('Erro na exportação dos pedidos!', { theme: "colored" })
    }
  };

  const fetchImportarPedidos = async (file) => {
    if (!file) {
        toast.error('Nenhum arquivo selecionado!', { theme: "colored" });
        return;
    }

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/java-api/produto-pedidos/importar-pedidos', {
            multipartFile: file
        },{
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.status === 200) {
            toast.success('Pedidos importados com sucesso!', { theme: "colored" });
            fetchAgenda();
        } else {
            const errorMessage = response.data?.message || response.statusText || 'Erro desconhecido';
            toast.error('Erro na importação dos Pedidos: ' + errorMessage, { theme: "colored" });
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        toast.error('Erro na importação dos Pedidos! ' + error.response.data?.message , { theme: "colored" });
    }
};

  const navigateToAdicionarPedido = () => {
    navigate('/adicionar-pedido');
  }

  const navigateToVisualizarPedido = (pedidoSelecionado) => {
    navigate('/visualizar-pedido', { state: { pedidoId: pedidoSelecionado } });
  }

  const navigateToKanban = () => {
    navigate('/kanban');
  }

  return (
    <>
      <ToastContainer />
      <div className={styles["mainContainer"]}>
        <Sidebar />
        <div className={styles["innerContainer"]}>
          <div className={styles["dashboardBreadcrumbsContainer"]}>
            <Breadcrumb />
          </div>
          <div className={styles["containerTittleCard"]}>
            <div className={styles["dashboardTittleCard"]}>
              <h2>Quadro de Planejamento</h2>
              <p>Organize os pedidos da semana conforme você os prepara.</p>
            </div>
          </div>
          <div className={styles["DivSpace"]}>
            <div className={styles["DivActions-1"]}>
              <div className={styles["DivButtonAddPedido"]}>
                <ButtonDefault
                  label="Adicionar Pedido"
                  showIcon="true"
                  icon="plus"
                  iconPosition="left"
                  fontSize="small"
                  width="100%"
                  className={styles['ButtonAddPedido']}
                  onClick={navigateToAdicionarPedido} />
              </div>
              <div className={styles["marginButtons"]}>
                <div style={{ marginRight: "2vw" }}>
                  <Filter options={['Mensal', 'Semanal']} onChange={handleFilterStatus} />
                </div>
              </div>
            </div>
            <div className={styles["DivActions-2"]}>
              <div className={styles["DivButtonTrocarVisualizacao"]}>
                <div>
                  <ButtonDefault
                    onClick={fetchExportarPedidos}
                    label="Exportar Pedidos"
                    showIcon={false} />
                </div>
                <div>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => fetchImportarPedidos(e.target.files[0])}
                  />
                  <ButtonDefault
                    onClick={() => document.getElementById('fileInput').click()}
                    label="Importar Pedidos"
                    showIcon={false} />
                </div>
                <div className={styles["BackgroundColorIcon"]}>
                  <img className={styles["IconAgenda"]} src={IconAgenda} alt="" />
                </div>
                <div onClick={navigateToKanban}>
                  <img className={styles["IconKanban"]} src={IconKanban} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles["AgendaNestedListContainer"]} style={{ marginTop: "3vh" }}>
            {testeMap.map((item, index) => (
              <NestedList
                key={index}
                testeMap={item}
                title={item.title}
                onClick={navigateToVisualizarPedido} />
            ))}
          </div>
          <div className={styles['gambiSpace']}>&nbsp;</div>
        </div>
      </div>
    </>
  );
}


export default Agenda;  