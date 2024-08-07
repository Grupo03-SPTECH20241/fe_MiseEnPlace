import React from "react";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/Cadastro"
import Dashboard from "./pages/Dashboard/dashboard"
import Loading from "./pages/Load/load"
import Stories from "./components/ComponentStories/componentstories";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Cadastro" element={<Cadastro />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Loading" element={<Loading />} />
                    <Route path="/Components" element={<Stories />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default Rotas;