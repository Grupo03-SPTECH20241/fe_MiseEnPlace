import React from "react";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/Cadastro"
import Dashboard from "./pages/Dashboard/dashboard"

import { BrowserRouter, Routes, Route } from "react-router-dom";
function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Cadastro" element={<Cadastro />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default Rotas;