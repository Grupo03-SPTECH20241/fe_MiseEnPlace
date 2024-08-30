import React, { useState } from "react";

// Componente para renderizar cada item da lista
const NestedListItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    console.log("Chamou o handleToggle");
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <div onClick={handleToggle} style={{ cursor: "pointer" }}>
        {item.title}
      </div>
        <ul>
            <li>
              <div>
                <p></p>
              </div>
            </li>
        </ul>
    </li>
  );
};

export default NestedListItem;