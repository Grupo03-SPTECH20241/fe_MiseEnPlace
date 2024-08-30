import NestedListItem from "./NestedListItem";
import { useState } from "react"; 
// Componente principal NestedList

function NestedList({ testeMap }) {
  console.log("esse aqui eo data", testeMap)

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    console.log("Chamou o handleToggle");
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div onClick={handleToggle}>
      <div>
        <h2>{testeMap[0].title}</h2>
      </div>
      {isOpen ?? testeMap.map((item, index) => {
         <NestedListItem key={index.pedidos} item={item} />
      })}

    </div>
    </>
  )
}

export default NestedList;
