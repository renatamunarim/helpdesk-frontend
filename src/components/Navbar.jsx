import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    window.location.href = "/"
  }

function irParaMeusChamados() {
  navigate("/usuario");
}

  function irParaPainelTecnico() {
    navigate("/tecnico");
  }

  function irParaNovoChamado() {
    navigate("/novo-chamado");
  }

  function irParaRelatorios() {
    navigate("/relatorios")
  }

  return (
    <div
      style={{
        width: "100%",
        padding: "12px 24px",
        background: "#2c3e50",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <b style={{ cursor: "pointer" }} onClick={irParaMeusChamados}>
          HelpDesk
        </b>


        <button onClick={irParaMeusChamados}>
          Meus Chamados
        </button>


        <button onClick={irParaNovoChamado}>
          Novo Chamado
        </button>


        {usuario?.perfil === "tecnico" && (
          <>
            <button onClick={irParaPainelTecnico}>
              Painel do Técnico
            </button>

            <button onClick={irParaRelatorios}>
              Relatórios
            </button>
          </>
        )}
      </div>

      {/* 🔹 LADO DIREITO (NOME + SAIR) */}
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginRight: 60,
        }}
      >
        <span>👤 {usuario?.nome || "Usuário"}</span>

        <button
          onClick={handleLogout}
          style={{
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
