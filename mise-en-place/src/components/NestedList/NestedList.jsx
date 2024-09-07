import NestedListItem from "./NestedListItem";
import styles from "./nestedList.module.css";
import { useEffect, useState } from "react";

function NestedList({ testeMap, title }) {

  const [isOpen, setIsOpen] = useState(false);
  const [itensList, setItensList] = useState([]);
  const [titulo, setTitulo] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    useEffect(() => {
      setItensList(testeMap.items);
      var title2 = title.split(", ");
      var date = title2[1].split("-");
      var dateFormatted = date[2] + '/' + date[1] + '/' + date[0];

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      today = dd + '/' + mm + '/' + yyyy;
      var isToday = dateFormatted === today ? true : false;
      var isTomorrow = dateFormatted === ("0" + (parseInt(dd) + 1) + '/' + mm + '/' + yyyy) ? true : false;

      setTitulo([title2[0] + ", "+ dateFormatted + (isToday ? " | Hoje" : isTomorrow? " | Amanhã" : "")]);
      console.log();
    }, []),
    <>
      {
        <div>
          <div>
            <div onClick={handleToggle} className={isOpen ? styles["cardTitleSelect"] : styles["cardTitle"]} >
                <p>{titulo}</p>
            </div>
            {isOpen && (
              <div>
                {itensList.map((item, index) => (
                  <NestedListItem key={index} testeMap={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      }

    </>
  )
}

export default NestedList;
