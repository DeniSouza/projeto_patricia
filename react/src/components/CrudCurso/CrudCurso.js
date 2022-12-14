import React, { Component } from 'react';
import axios from 'axios';
import './CrudCurso.css';
import Main from '../template/Main';


const title = "Cadastro de Curso";

const urlAPI = "http://localhost:5120/api/curso";
const initialState = {
    curso: { id: 0, CursoId: 0, nomeCurso: '', periodo: '' },
    lista: []
}

export default class CrudCurso extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
            console.log(resp.data)
        })
    }

    limpar() {
        this.setState({ curso: initialState.curso });
    }
    salvar() {
        const curso = this.state.curso;
        curso.codCurso = Number(curso.codCurso);
        const metodo = curso.id ? 'put' : 'post';
        const url = curso.id ? `${urlAPI}/${curso.id}` : urlAPI;
        axios[metodo](url, curso)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ curso: initialState.curso, lista })
            })
    }
    getListaAtualizada(curso, add = true, remove = false) {
        const lista = this.state.lista.filter(a => a.id !== curso.id);
        if (add) lista.unshift(curso);
        if (remove) lista.splice(curso);
        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const curso = { ...this.state.curso };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        curso[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ curso });
    }

    carregar(curso) {
        this.setState({ curso })
    }
    remover(curso) {
        const url = urlAPI + "/" + curso.id;
        if (window.confirm("Confirma remoção do curso: " + curso.id)) {
            axios['delete'](url, curso)
                .then(resp => {
                    const lista = this.getListaAtualizada(curso, false)
                    this.setState({ curso: initialState.curso, lista })
                })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Cod Curso: </label>
                <input
                    type="number"
                    id="codCurso"
                    placeholder="Codigo Curso"
                    className="form-input"
                    name="codCurso"

                    value={this.state.curso.codCurso}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Nome Curso: </label>
                <input
                    type="text"
                    id="nomeCurso"
                    placeholder="Nome do curso"
                    className="form-input"
                    name="nomeCurso"

                    value={this.state.curso.nomeCurso}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Período do Curso: </label>
                <input
                    type="text"
                    id="periodo"
                    placeholder="Periodo do curso"
                    className="form-input"
                    name="periodo"
                    value={this.state.curso.periodo}
                    onChange={e => this.atualizaCampo(e)}
                />
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
                <table className="listaCurso" id="tblListaCurso">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloCurso">Codigo curso</th>
                            <th className="tabTituloNomeCurso">Nome Curso</th>
                            <th className="tabTituloPeriodo">Periodo</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (curso) =>
                                <tr key={curso.id}>
                                    <td>{curso.codCurso}</td>
                                    <td>{curso.nomeCurso}</td>
                                    <td>{curso.periodo}</td>
                                    <td>
                                        <button onClick={() => this.carregar(curso)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(curso)} >
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