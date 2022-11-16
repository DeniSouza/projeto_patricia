import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Cadastro.css";



export default function Cadastro() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();



    return (
        <div className="content">
            <h1 className="tituloAuth">Cadastro de Usuário</h1>
            <form className="formLogin" >
                <div>
                    <label className="lblLogin" htmlFor="'username'">Nome:
                    </label>
                    <input
                        type="text"
                        value={username}
                        placeholder="Digite seu nome"
                        className="inputAuth"
                        onChange={({ target }) => {
                            setUsername(target.value);

                            setMessage("");
                        }}
                    />
                </div>

                <div>
                    <label className="lblLogin" htmlFor="'username'">Email:

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
                <button type="submit">Criar usuário</button>
                <h4 className="msgErro">{message}</h4>
            </form>
        </div>
    );
}