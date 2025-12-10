import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"

export default function DashboardUsuario() {
  const [chamados, setChamados] = useState([])

  useEffect(() => {
    api.get("/chamados").then((response) => {
      setChamados(response.data)
    })
  }, [])

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: 800, margin: "auto", marginTop: 100 }}>
        <h2>Meus Chamados</h2>

        {chamados.length === 0 ? (
          <p>Você ainda não tem chamados.</p>
        ) : (
          chamados.map((c) => (
            <div key={c.id} style={{ borderBottom: "1px solid #ddd", padding: 10 }}>
              <h4>{c.titulo}</h4>
              <p>{c.descricao}</p>
              <p><b>Status:</b> {c.status}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
