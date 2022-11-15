import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
   
    return (
        <div className="content">
            <h1 className="tituloAuth">Login</h1>
            <form className="formLogin" >
                <div>
                    <label className="lblLogin" htmlFor="'username'">Username:

                    </label>

                    <input
                        type="text"
                        value={username}
                        placeholder="Digite o e-mail"
                        className="inputAuth"
                        onChange={({ target }) => {
                            setUsername(target.value);

                            setMessage("");
                        }}
                    />
                </div>
                <div>
                    <label className="lblLogin" htmlFor="senha">Senha:

                    </label>

                    <input
                        type="password"
                        value={password}
                        placeholder="Digite a senha"
                        className="inputAuth"
                        onChange={({ target }) => {
                            setPassword(target.value);

                            setMessage("");
                        }}
                    />
                </div>
                <button type="submit">Login</button>
                
                <button type="submit">Ainda não tem Cadastro? Faça sua conta aqui</button>

                <h4 className="msgErro">{message}</h4>
            </form>
        </div>
    );
}