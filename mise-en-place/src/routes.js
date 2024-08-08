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
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/loading" element={<Loading />} />
                    <Route path="/components" element={<Stories />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default Rotas;