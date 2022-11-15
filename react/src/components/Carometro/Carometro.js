import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from "../template/Main";
import Cards from "../template/Card";
import "./Carometro.css";

export default function Carometro() {


    const title = "Carômetro";
    const [cursos, setCursos] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [inputCurso, setInputCurso] = useState([]);

    const urlCurso = "http://localhost:5120/api/curso";
    const urlAluno = "http://localhost:5120/api/aluno";
    const urlImg =   "http://xsgames.co/randomusers/assets/avatars/pixel/";

    useEffect(() => {
        axios(urlAluno).then((reponse) => {
            setAlunos(
                reponse.data.map((aluno) => ({
                    id: aluno.id,
                    ra: aluno.ra,
                    nome: aluno.nome,
                    codCurso: aluno.codCurso,
                }))
            );
        });
    }, []);

    useEffect(() => {
        axios(urlCurso).then((reponse) => {
            setCursos(
                reponse.data.map((curso) => ({
                    id: curso.id,
                    codCurso: curso.codCurso,
                    nomeCurso: curso.nomeCurso,
                    periodo: curso.periodo,
                }))
            );
        });
    }, []);

    const atualizaCurso = (codCurso) => {
        const curso = cursos.find((curso) => String(curso.codCurso) === codCurso);

        setInputCurso(curso);
    };

    const selecionaAlunos = (alunos) => {
        if (inputCurso) {
            return alunos.filter((aluno) => aluno.codCurso === inputCurso.codCurso);
        }

        return alunos;
    };

    return (
        <Main title={title}>
            <div>
                <div>
                    <select
                        className="select"
                        onChange={(event) => atualizaCurso(event.target.value)}
                        value={
                            inputCurso
                                ? cursos.find(
                                    (curso) => curso.nomeCurso === inputCurso.nomeCurso
                                )?.codCurso : ""
                        }
                    >
                        <option value="">
                            Todos
                        </option>
                        {cursos.map((curso) => (
                            <option value={curso.codCurso} key={curso.codCurso}>
                                {curso.nomeCurso}
                            </option>
                        ))}
                    </select>
                    <p></p> {/* Coloquei essa tag p para separar o card do botão de selecionar*/}
                </div>
                {selecionaAlunos(alunos).map((aluno) => (
                    <Cards
                        codCurso={aluno.codCurso}
                        nome={aluno.nome}
                        ra={aluno.ra}
                        key={aluno.ra}
                        img={`${urlImg}${aluno.id}.jpg`}
                    />
                ))}
            </div>
            
        </Main>
        
    );
}