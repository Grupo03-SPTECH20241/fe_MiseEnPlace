import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Dashboard from "./pages/Dashboard/dashboard";
import Loading from "./pages/Load/load";
import Produtos from "./pages/Produtos/produtos";
import Stories from "./components/ComponentStories/componentstories";
import Carrinho from "./pages/Carrinho/carrinho"
import Kanban from "./pages/Kanban/kanban";
import Agenda from "./pages/Agenda/Agenda"
import ProdutoCadastro from "./pages/ProdutoCadastro/produtoCadastro";
import ProdutoEditar from "./pages/ProdutoEditar/produtoEditar";
import VisualizarPedido from "./pages/VisualizarPedido/visualizarPedido";
import AdicionarPedido from "./pages/AdicionarPedido/adicionarPedido";

function Rotas() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route element=""></Route>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/components" element={<Stories />} />
                <Route path="/carrinho" element={<Carrinho />}/>
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/produto-cadastro" element={<ProdutoCadastro />} />
                <Route path="/produto-editar" element={<ProdutoEditar />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/visualizar-pedido" element={<VisualizarPedido />} />
                <Route path="/adicionar-pedido" element={<AdicionarPedido />} />
            </Routes>
        </BrowserRouter>  
        </>
  
    );
}

export default Rotas;
