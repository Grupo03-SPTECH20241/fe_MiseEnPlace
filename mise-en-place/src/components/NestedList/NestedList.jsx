import NestedListItem from "./NestedListItem";
import styles from "./nestedList.module.css";
import setaLista from "../../utils/img/setaLista.png"; // Adicionei a imagem da seta
import { useEffect, useState } from "react";

function NestedList({ testeMap, title, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itensList, setItensList] = useState([]);
  const [titulo, setTitulo] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setItensList(testeMap.items);
    const title2 = title.split(", ");
    const date = title2[1].split("-");
    const dateFormatted = `${date[2]}/${date[1]}/${date[0]}`;

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!  
    const yyyy = today.getFullYear();

    const todayFormatted = `${dd}/${mm}/${yyyy}`;
    const isToday = dateFormatted === todayFormatted;
    const isTomorrow = dateFormatted === `0${parseInt(dd) + 1}/${mm}/${yyyy}`;

    const quantidadePedidos = testeMap.items.length;  // Quantidade de pedidos

    setTitulo(`${title2[0]}, ${dateFormatted}${isToday ? " | Hoje" : isTomorrow ? " | Amanhã" : ""}`);
  }, [title, testeMap]);

  return (
    <>
      <div>
        <div onClick={handleToggle} className={isOpen ? styles["cardTitleSelect"] : styles["cardTitle"]}>
          <div className={styles["titleContent"]}>
            <div className={styles["titleContent2"]}>
              <img src={setaLista} alt="Seta Lista" className={`${styles["setaLista"]} ${isOpen ? styles.up : styles.down}`} />
              <p>{titulo}</p>
            </div>
            <span className={styles["quantidadePedidos"]}>Qtd. pedidos: {itensList.length}</span>
          </div>
        </div>
        <div className={`${styles["listContainer"]} ${isOpen ? styles["open"] : ""}`}>
          {itensList.map((item, index) => (
            <div key={index} onClick={() => { onClick(item?.pedido); }} className={styles["cardInfoContainer"]}>
              <NestedListItem testeMap={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NestedList;
