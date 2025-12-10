import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardUsuario from "./pages/DashboardUsuario";
import DashboardTecnico from "./pages/DashboardTecnico";
import AbrirChamado from "./pages/AbrirChamado";
import Relatorios from "./pages/Relatorios";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/usuario" element={<DashboardUsuario />} />
        <Route path="/tecnico" element={<DashboardTecnico />} />
        <Route path="/novo-chamado" element={<AbrirChamado />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  );
}
