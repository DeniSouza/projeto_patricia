import React, { Component } from 'react';
import axios from 'axios';
import './Montadora.css';
import Main from '../template/Main';


const title = "Cadastro de Montadora";

const urlAPI = "http://localhost:5120/api/montadora";
const initialState = {
    montadora: { id: 0, codMontadora:0, montadora: '', país: '' },
    lista: []
}

export default class Montadora extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
            console.log(resp.data)
        })
    }

    limpar() {
        this.setState({ montadora: initialState.montadora });
    }
    salvar() {
        const montadora = this.state.montadora;
        montadora.codMontadora = Number(montadora.codMontadora);
        const metodo = montadora.id ? 'put' : 'post';
        const url = montadora.id ? `${urlAPI}/${montadora.id}` : urlAPI;
        axios[metodo](url, montadora)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ montadora: initialState.montadora, lista })
            })
    }
    getListaAtualizada(montadora, add = true, remove = false) {
        const lista = this.state.lista.filter(a => a.id !== montadora.id);
        if (add) lista.unshift(montadora);
        if (remove) lista.splice(montadora);
        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const montadora = { ...this.state.montadora };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        montadora[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ montadora });
    }

    carregar(montadora) {
        this.setState({ montadora })
    }
    remover(montadora) {
        const url = urlAPI + "/" + montadora.id;
        if (window.confirm("Confirma remoção do montadora: " + montadora.id)) {
            axios['delete'](url, montadora)
                .then(resp => {
                    const lista = this.getListaAtualizada(montadora, false)
                    this.setState({ montadora: initialState.montadora, lista })
                })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                 <label> Codigo montadora: </label>
                <input
                    type="number"
                    id="codMontadora"
                    placeholder="Nome da Montadora"
                    className="form-input"
                    name="codMontadora"

                    value={this.state.montadora.codMontadora}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Nome montadora: </label>
                <input
                    type="text"
                    id="montadora"
                    placeholder="Nome da Montadora"
                    className="form-input"
                    name="montadora"

                    value={this.state.montadora.montadora}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> País da montadora: </label>
                <input
                    type="text"
                    id="pais"
                    placeholder="País da Montadora"
                    className="form-input"
                    name="pais"

                    value={this.state.montadora.pais}

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
                <table className="listaMontadora" id="tblListaMontadora">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloMontadora">Montadora</th>
                            <th className="tabTituloPaís">País</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (montadora) =>
                                <tr key={montadora.id}>
                                    <td>{montadora.montadora}</td>
                                    <td>{montadora.pais}</td>                                
                                    <td>
                                        <button onClick={() => this.carregar(montadora)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(montadora)} >
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