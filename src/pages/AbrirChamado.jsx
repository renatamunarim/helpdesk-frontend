import { useState, useContext } from "react"
import api from "../api/api"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function AbrirChamado() {
  const { usuario } = useContext(AuthContext)
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [categoria, setCategoria] = useState("")
  const [prioridade, setPrioridade] = useState("")

  function voltarParaDashboard() {
    if (usuario?.perfil === "tecnico") {
      navigate("/tecnico")
    } else {
      navigate("/usuario")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await api.post("/chamados", {
        titulo,
        descricao,
        categoria,
        prioridade,
      })

      voltarParaDashboard()

    } catch (error) {
      console.error(error)
      alert("Erro ao criar chamado")
    }
  }

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: 500, margin: "auto", marginTop: 120 }}>
        <h2>Abertura de Chamado</h2>



        <button
          onClick={voltarParaDashboard}
          style={{
            marginBottom: 16,
            background: "#95a5a6",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 6
          }}
        >
        Voltar
        </button>

        <form onSubmit={handleSubmit}>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            required
          />

          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            required
          />

          <input
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Categoria"
            required
          />

          <input
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            placeholder="Prioridade"
            required
          />

          <button type="submit" style={{ marginTop: 10 }}>
          Cadastrar Chamado
          </button>
        </form>
      </div>
    </>
  );
}
