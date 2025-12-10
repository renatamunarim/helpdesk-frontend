export default function FilterBar({
  statusFilter,
  setStatusFilter,
  q,
  setQ,
  onRefresh,
}) {
  return (
    <div style={{
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: 8
    }}>
      <input
        placeholder="Buscar por título/descrição/usuário"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ padding: 8, minWidth: 240 }}
      />

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: 8 }}>
        <option value="todos">Todos os status</option>
        <option value="aberto">Aberto</option>
        <option value="em_andamento">Em andamento</option>
        <option value="concluido">Concluído</option>
      </select>

      <button onClick={onRefresh} style={{ padding: "8px 12px" }}>Atualizar</button>
    </div>
  );
}
