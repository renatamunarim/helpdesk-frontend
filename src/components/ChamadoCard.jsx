import { useState } from "react";
import api from "../api/api";

export default function ChamadoCard({ chamado, onUpdated, onRemoved }) {
  const [saving, setSaving] = useState(false);

  const {
    id,
    titulo,
    descricao,
    categoria,
    prioridade,
    status,
    usuarioId,
    criado_em,
  } = chamado;

  function formatarStatus(status) {
    if (status === "aberto") return "Aberto";
    if (status === "em_andamento") return "Em andamento";
    if (status === "concluido") return "Concluído";
    return status;
  }

  async function setarStatusDireto(novoStatus) {
    if (!window.confirm(`Alterar status para "${formatarStatus(novoStatus)}"?`))
      return;

    setSaving(true);
    try {
      const res = await api.put(`/chamados/${id}`, { status: novoStatus });
      onUpdated(id, res.data);
    } catch {
      alert("Erro ao atualizar status");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Remover este chamado?")) return;

    setSaving(true);
    try {
      await api.delete(`/chamados/${id}`);
      onRemoved(id);
    } catch {
      alert("Erro ao remover chamado");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      <h3>{titulo}</h3>

      <small>
        #{id} • {chamado?.usuario?.nome} • {new Date(criado_em).toLocaleString()}
      </small>

      <p>{descricao}</p>

      <p>
        <b>Status:</b> {formatarStatus(status)}
      </p>

      <p>
        <b>Categoria:</b> {categoria}
      </p>

      <p>
        <b>Prioridade:</b> {prioridade}
      </p>

      <button
        onClick={() => setarStatusDireto("aberto")}
        disabled={saving}
      >
        Aberto
      </button>

      <button
        onClick={() => setarStatusDireto("em_andamento")}
        disabled={saving}
      >
        Em andamento
      </button>

      <button
        onClick={() => setarStatusDireto("concluido")}
        disabled={saving}
      >
        Concluído
      </button>

      <button
        onClick={handleDelete}
        disabled={saving}
        style={{ marginLeft: 10 }}
      >
        Excluir
      </button>
    </div>
  );
}
