import { useContext, useState } from "react"
import api from "../api/api"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function handleSubmit(e) {
  e.preventDefault()

  try {
    const response = await api.post("/auth/login", { email, senha })

    const token = response.data.token
    login(token)

    const payload = JSON.parse(atob(token.split(".")[1]))

    if (payload.perfil === "tecnico") {
      navigate("/tecnico")
    } else {
      navigate("/usuario")
    }

  } catch (error) {
    alert("Credenciais inválidas")
  }
}


  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 80 }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />

        <input
          value={senha}
          type="password"
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
        />

        <button type="submit" style={{ width: "100%", marginTop: 10 }}>
          Entrar
        </button>
      </form>

      <p style={{ marginTop: 16, textAlign: "center" }}>
        Ainda não tem cadastro?
      </p>

      <button
        onClick={() => navigate("/register")}
        style={{ width: "100%" }}
      >
        Criar conta
      </button>
    </div>
  );
}
