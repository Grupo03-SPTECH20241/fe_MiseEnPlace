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
import Configuracao from "./pages/Configuracao/configuracao"
import RotasProtegidas from "./components/RotasProtegidas/rotasProtegidas";

function Rotas() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loading" element={<Loading />} />

                <Route path="/dashboard" element={
                    <RotasProtegidas> 
                        <Dashboard />
                    </RotasProtegidas>
                } 
                ></Route>

                <Route path="/produtos" element={
                    <RotasProtegidas> 
                        <Produtos />
                    </RotasProtegidas>} 
                ></Route>

                <Route path="/carrinho" element={
                    <RotasProtegidas> 
                        <Carrinho />
                    </RotasProtegidas>}
                ></Route>

                <Route path="/kanban" element={
                    <RotasProtegidas> 
                        <Kanban />
                    </RotasProtegidas> 
                }
                ></Route>

                <Route path="/produto-cadastro" element={
                    <RotasProtegidas> 
                        <ProdutoCadastro />
                    </RotasProtegidas>} 
                ></Route>

                <Route path="/produto-editar" element={
                    <RotasProtegidas> 
                        <ProdutoEditar />
                    </RotasProtegidas>} 
                ></Route>

                <Route path="/agenda" element={
                    <RotasProtegidas> 
                        <Agenda />
                    </RotasProtegidas>} 
                ></Route>

                <Route path="/visualizar-pedido" element={
                    <RotasProtegidas> 
                        <VisualizarPedido />
                    </RotasProtegidas>} 
                ></Route>

                <Route path="/adicionar-pedido" element={
                    <RotasProtegidas> 
                        <AdicionarPedido />
                    </RotasProtegidas>} 
                ></Route>

                <Route path="/configuracao" element={
                    <RotasProtegidas> 
                        <Configuracao />
                    </RotasProtegidas>} 
                ></Route>

                <Route path="/components" element={<Stories />} />
            </Routes>
        </BrowserRouter>  
        </>
  
    );
}

export default Rotas;
