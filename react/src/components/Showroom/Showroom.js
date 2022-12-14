import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from "../template/Main";
import Cards from "../template/Card";
import "./Showroom.css";

export default function Showroom() {


    const title = "Showroom";
    const [veiculo, setVeiculo] = useState([]);
    const [montadora, setMontadora] = useState([]);
    const [inputMontadora, setInputMontadora] = useState([]);

    const urlMontadora = "http://localhost:5120/api/montadora";
    const urlVeiculo = "http://localhost:5120/api/veiculo";

    useEffect(() => {
        axios(urlVeiculo).then((reponse) => {
            setVeiculo(
                reponse.data.map((veiculo) => ({
                    id: veiculo.id,
                    modelo: veiculo.modelo,
                    nomeMontadora: veiculo.nomeMontadora,
                    valor:veiculo.valor,
                    ano: veiculo.ano,
                    cor: veiculo.cor,
                    km: veiculo.km,
                    placa:veiculo.placa,
                    valor: veiculo.valor
                }))
            );
        });
    }, []);

    useEffect(() => {
        axios(urlMontadora).then((reponse) => {
            setMontadora(
                reponse.data.map((montadora) => ({
                    id: montadora.id,
                    montadora: montadora.montadora,
                    pais: montadora.pais,
                    codMontadora: montadora.codMontadora,                    
                }))
            );
        });
    }, []);

    const atualizaMontadora = (codMontadora) => {
        const montadora = montadora.find((montadora) => String(montadora.codMontadora) === codMontadora);

        setInputMontadora(montadora);
    };

    const selecionaVeiculo = (veiculo) => {
        if (inputMontadora) {
            return veiculo.filter((veiculo) => veiculo.montadora === inputMontadora.montadora);
        }

        return veiculo;
    };

    return (
        <Main title={title}>
            <div>
                <div>
                    <select
                        className="select"
                        onChange={(event) => atualizaMontadora(event.target.value)}
                        value={
                            inputMontadora
                                ? montadora.find(
                                    (montadora) => montadora.montadora === inputMontadora.montadora
                                )?.codCurso : ""
                        }
                    >
                        <option value="">
                            Todos
                        </option>
                        {montadora.map((montadora) => (
                            <option value={montadora.montadora} key={montadora.montadora}>
                                {montadora.montadora}
                            </option>
                        ))}
                    </select>
                    <p></p> {/* Coloquei essa tag p para separar o card do bot??o de selecionar*/}
                </div>
                {selecionaVeiculo(veiculo).map((veiculo) => (
                    <Cards
                        nomeMontadora={veiculo.nomeMontadora}
                        modelo={veiculo.modelo}
                        ano={veiculo.ano}
                        valor={veiculo.valor}
                        key={montadora.id}
                        img={`${veiculo.id}.jpg`}
                    />
                ))}
            </div>
            
        </Main>
        
    );
}