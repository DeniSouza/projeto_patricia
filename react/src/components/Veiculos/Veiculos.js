import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import './Veiculos.css';
import Main from '../template/Main';
import '../CrudCurso/CrudCurso.js';


const title = "Cadastro de Veiculos";

const urlCurso = "http://localhost:5120/api/curso";
const urlAPI = "http://localhost:5120/api/veiculo";
const initialState = {
    veiculo: { id: 0, modelo: '', ano: 0, cor: '', placa: '', montadora: '', km: 0 },
    lista: [],
    listaMontadora: [],
}


export default class Veiculos extends Component {

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
        this.setState({ veiculo: initialState.veiculo });
    }
    salvar() {
        const veiculo = this.state.veiculo;
        veiculo.codCurso = Number(veiculo.modelo);
        const metodo = veiculo.id ? 'put' : 'post';
        const url = veiculo.id ? `${urlAPI}/${veiculo.id}` : urlAPI;

        axios[metodo](url, veiculo)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ veiculo: initialState.veiculo, lista })
            })
    }
    getListaAtualizada(veiculo, add = true, remove = false) {
        const lista = this.state.lista.filter(a => a.id !== veiculo.id);
        if (add) lista.unshift(veiculo);
        if (remove) lista.splice(veiculo);
        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const veiculo = { ...this.state.veiculo };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        veiculo[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ veiculo });
    }

    carregar(veiculo) {
        this.setState({ veiculo })
    }
    remover(veiculo) {
        const url = urlAPI + "/" + veiculo.id;
        if (window.confirm("Confirma remoção do veiculo: " + veiculo.id)) {
            console.log("entrou no confirm");
            axios['delete'](url, veiculo)
                .then(resp => {
                    const lista = this.getListaAtualizada(veiculo, false)
                    this.setState({ veiculo: initialState.veiculo, lista })
                })
        }
    }







    renderForm() {
        return (
            <div className="inclui-container">
                <label> Montadora </label>
                <input
                    type="text"
                    id="montadora"
                    placeholder="Montadora"
                    className="form-input"
                    name="montadora"

                    value={this.state.veiculo.montadora}

                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Modelo: </label>
                <input
                    type="text"
                    id="modelo"
                    placeholder="Modelo"
                    className="form-input"
                    name="modelo"

                    value={this.state.veiculo.modelo}

                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Ano: </label>
                <input
                    type="number"
                    id="ano"
                    placeholder="Ano"
                    className="form-input"
                    name="ano"

                    value={this.state.veiculo.ano}

                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Placa: </label>
                <input
                    type="text"
                    id="placa"
                    placeholder="Placa"
                    className="form-input"
                    name="placa"

                    value={this.state.veiculo.placa}

                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Quilometragem: </label>
                <input
                    type="number"
                    id="km"
                    placeholder="KM do Veículo"
                    className="form-input"
                    name="km"

                    value={this.state.veiculo.km}

                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Cor: </label>
                <input
                    type="text"
                    id="cor"
                    placeholder="Cor"
                    className="form-input"
                    name="cor"

                    value={this.state.veiculo.cor}

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
                <table className="listaveiculos" id="tblListaveiculos">
                    <thead>
                        <tr className="cabecTabela">
                        <th className="cabecTabela">Montadora</th>
                            <th className="cabecTabela">Modelo</th>
                            <th className="cabecTabela">Ano</th>
                            <th className="cabecTabela">Cor</th>
                            <th className="cabecTabela">Placa</th>
                            <th className="cabecTabela">Quilometragem</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (veiculo) =>
                                <tr key={veiculo.id}>                                    
                                    <td>{veiculo.montadora}</td>                                    
                                    <td>{veiculo.modelo}</td>
                                    <td>{veiculo.ano}</td>
                                    <td>{veiculo.cor}</td>
                                    <td>{veiculo.placa}</td>
                                    <td>{veiculo.km}</td>
                                    <td></td>
                                    <td>
                                        <button onClick={() => this.carregar(veiculo)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(veiculo)} >
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