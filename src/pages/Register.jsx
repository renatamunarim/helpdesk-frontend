import { useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [perfil, setPerfil] = useState("usuario")

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        nome,
        email,
        senha,
        perfil,
      });

      navigate("/")
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
      <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Senha" />

      <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
        <option value="usuario">Usuário</option>
        <option value="tecnico">Técnico</option>
      </select>

      <button type="submit">Cadastrar</button>
    </form>
  )
}
