import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import './CrudAluno.css';
import Main from '../template/Main';
import '../CrudCurso/CrudCurso.js';


const title = "Cadastro de Alunos";

const urlCurso = "http://localhost:5120/api/curso";
const urlAPI = "http://localhost:5120/api/aluno";
const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
    lista: [],
    listaCurso: [],
}


export default class CrudAluno extends Component {

    state = {
        ...initialState
    }    

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
            console.log(resp.data)
        })
        axios(urlCurso).then(response => {
            this.setState({ listaCurso: response.data })
            console.log(response.data);
        })
    }

    limpar() {
        this.setState({ aluno: initialState.aluno });
    }
    salvar() {
        const aluno = this.state.aluno;
        aluno.codCurso = Number(aluno.codCurso);
        const metodo = aluno.id ? 'put' : 'post';
        const url = aluno.id ? `${urlAPI}/${aluno.id}` : urlAPI;

        axios[metodo](url, aluno)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ aluno: initialState.aluno, lista })
            })
    }
    getListaAtualizada(aluno, add = true, remove = false) {
        const lista = this.state.lista.filter(a => a.id !== aluno.id);
        if (add) lista.unshift(aluno);
        if (remove) lista.splice(aluno);
        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const aluno = { ...this.state.aluno };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        aluno[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ aluno });
    }

    carregar(aluno) {
        this.setState({ aluno })
    }
    remover(aluno) {
        const url = urlAPI + "/" + aluno.id;
        if (window.confirm("Confirma remoção do aluno: " + aluno.ra)) {
            console.log("entrou no confirm");
            axios['delete'](url, aluno)
                .then(resp => {
                    const lista = this.getListaAtualizada(aluno, false)
                    this.setState({ aluno: initialState.aluno, lista })
                })
        }
    }







    renderForm() {
        return (
               <div className="inclui-container">
                <label> RA: </label>
                <input
                    type="text"
                    id="ra"
                    placeholder="RA do aluno"
                    className="form-input"
                    name="ra"

                    value={this.state.aluno.ra}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome do aluno"
                    className="form-input"
                    name="nome"

                    value={this.state.aluno.nome}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Código do Curso: </label>
                <select
                    id="codCurso"
                    name="codCurso"
                    className="form-input"
                    value={this.state.aluno.codCurso}
                    onChange={e => this.atualizaCampo(e)}
                    placeholder="Selecione o curso"
                >
                    <option value = "0">Selecione uma opção</option>
                    {this.state.listaCurso.map( curso => (<option key= {curso.codCurso} value = {curso.codCurso}>{curso.codCurso} - {curso.nomeCurso}</option>))}
                </select>


                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Ra</th>
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloCurso">Curso</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (aluno) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.ra}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.codCurso}</td>
                                    <td>
                                        <button onClick={() => this.carregar(aluno)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(aluno)} >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {this.renderForm()}
                {this.renderTable()}                
            </Main>
            
        )
    }


}