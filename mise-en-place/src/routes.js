import React from "react";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/Cadastro"
import Dashboard from "./pages/Dashboard/dashboard"
import Loading from "./pages/Load/load"
import Produtos from "./pages/Produtos/produtos" 
import Stories from "./components/ComponentStories/componentstories";
import Carrinho from "./pages/Carrinho/carrinho"
import Kanban from "./pages/Kanban/kanban";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/loading" element={<Loading />} />
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/components" element={<Stories />} />
                    <Route path="/carrinho" element={<Carrinho />}/>
                    <Route path="/kanban" element={<Kanban />} />
                </Routes>
            </BrowserRouter>    
        </>
    );
}
export default Rotas;