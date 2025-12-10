import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"
import jsPDF from "jspdf"

export default function Relatorios() {
  const [resumo, setResumo] = useState(null)
  const [abertos, setAbertos] = useState([])
  const [andamento, setAndamento] = useState([])
  const [concluidos, setConcluidos] = useState([])

  async function carregarRelatorio() {
    try {
      const res = await api.get("/chamados/relatorios")
      setResumo(res.data.resumo)
      setAbertos(res.data.chamadosAbertos)
      setAndamento(res.data.chamadosAndamento)
      setConcluidos(res.data.chamadosConcluidos)
    } catch (error) {
      console.error(error)
      alert("Erro ao carregar relatório")
    }
  }

  useEffect(() => {
    carregarRelatorio()
  }, [])

  function gerarPDF() {
    if (!resumo) return

    const doc = new jsPDF()
    let y = 10

    doc.setFontSize(16)
    doc.text("Relatório Técnico - HelpDesk", 10, y)

    y += 10
    doc.setFontSize(12)
    doc.text(`Abertos: ${resumo.abertos}`, 10, y); y += 6
    doc.text(`Em andamento: ${resumo.andamento}`, 10, y); y += 6
    doc.text(`Concluídos: ${resumo.concluidos}`, 10, y)

    function escreverChamados(titulo, lista) {
      if (y > 250) {
        doc.addPage()
        y = 10
      }

      y += 12
      doc.setFontSize(14)
      doc.text(titulo, 10, y)
      y += 8
      doc.setFontSize(11)

      if (lista.length === 0) {
        doc.text("Nenhum chamado.", 10, y)
        y += 10
        return
      }

      lista.forEach((c) => {
        if (y > 270) {
          doc.addPage()
          y = 10
        }

        doc.text(`Título: ${c.titulo}`, 10, y); y += 6
        doc.text(`Descrição: ${c.descricao}`, 10, y); y += 6
        doc.text(`Categoria: ${c.categoria} | Prioridade: ${c.prioridade}`, 10, y); y += 6
        doc.text(`Data: ${new Date(c.criado_em).toLocaleString()}`, 10, y)
        y += 10
      })
    }

    escreverChamados("Chamados em Aberto", abertos)
    escreverChamados("Chamados em Andamento", andamento)
    escreverChamados("Chamados Concluídos", concluidos)

    doc.save("relatorio-helpdesk.pdf")
  }

  if (!resumo) {
    return (
      <>
        <Navbar />
        <div style={{ padding: 20, marginTop: 120 }}>
          <h2>Carregando relatório...</h2>
        </div>
      </>
    )
  }

  function renderLista(titulo, lista) {
    return (
      <>
        <h2>{titulo}</h2>

        {lista.length === 0 ? (
          <p>Nenhum chamado.</p>
        ) : (
          lista.map((c) => (
            <div
              key={c.id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <h4>{c.titulo}</h4>
              <p>{c.descricao}</p>
              <p><b>Categoria:</b> {c.categoria}</p>
              <p><b>Prioridade:</b> {c.prioridade}</p>
              <p><b>Data:</b> {new Date(c.criado_em).toLocaleString()}</p>
            </div>
          ))
        )}
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: 20, marginTop: 120 }}>
        <h1>Relatório Técnico</h1>

        <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
          <div style={{ padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
            <b>Abertos</b>
            <p>{resumo.abertos}</p>
          </div>

          <div style={{ padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
            <b>Em andamento</b>
            <p>{resumo.andamento}</p>
          </div>

          <div style={{ padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
            <b>Concluídos</b>
            <p>{resumo.concluidos}</p>
          </div>
        </div>

        {renderLista("Chamados em Aberto", abertos)}
        {renderLista("Chamados em Andamento", andamento)}
        {renderLista("Chamados Concluídos", concluidos)}

        <button
          onClick={gerarPDF}
          style={{
            marginTop: 30,
            padding: "10px 20px",
            background: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          GERAR RELATÓRIO EM PDF
        </button>
      </div>
    </>
  )
}
