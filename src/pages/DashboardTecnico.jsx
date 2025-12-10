import { useEffect, useState, useContext } from "react"
import api from "../api/api"
import ChamadoCard from "../components/ChamadoCard"
import FilterBar from "../components/FilterBar"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function DashboardTecnico() {
  const { usuario } = useContext(AuthContext)
  const navigate = useNavigate()

  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)

  const [statusFilter, setStatusFilter] = useState("todos")
  const [categoriaFilter, setCategoriaFilter] = useState("todos")
  const [prioridadeFilter, setPrioridadeFilter] = useState("todos")
  const [q, setQ] = useState("")

  useEffect(() => {
    if (!usuario || usuario.perfil !== "tecnico") {
      navigate("/")
    }
  }, [usuario, navigate])

  async function fetchChamados() {
    setLoading(true)
    const res = await api.get("/chamados/all")
    setChamados(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchChamados()
  }, []);

  const chamadosFiltrados = chamados.filter((c) => {
    if (statusFilter !== "todos" && c.status !== statusFilter) return false
    if (categoriaFilter !== "todos" && c.categoria !== categoriaFilter) return false
    if (prioridadeFilter !== "todos" && c.prioridade !== prioridadeFilter) return false
    if (q && !`${c.titulo} ${c.descricao}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  function atualizarLocal(id, novoObjeto) {
    setChamados((prev) => prev.map((c) => (c.id === id ? novoObjeto : c)))
  }

  function removerLocal(id) {
    setChamados((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: 20, marginTop: 80 }}>
        <h1>Painel do Técnico</h1>

        <FilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoriaFilter={categoriaFilter}
          setCategoriaFilter={setCategoriaFilter}
          prioridadeFilter={prioridadeFilter}
          setPrioridadeFilter={setPrioridadeFilter}
          q={q}
          setQ={setQ}
          onRefresh={fetchChamados}
        />

        {loading ? <p>Carregando...</p> : chamadosFiltrados.map((chamado) => (
          <ChamadoCard
            key={chamado.id}
            chamado={chamado}
            onUpdated={atualizarLocal}
            onRemoved={removerLocal}
          />
        ))}
      </div>
    </>
  );
}
