import React from 'react';
import { Routes, Route } from "react-router-dom";

import Main from './components/template/Main';
import CrudAluno from './components/CrudAluno/CrudAluno';
import CrudCurso from './components/CrudCurso/CrudCurso';
import Showroom from './components/Showroom/Showroom';
import Veiculos from './components/Veiculos/Veiculos';
import Montadora from './components/Montadora/Montadora';
import Login from './components/Login/Login';
export default function Rotas() {
    return (
     <Routes>
        <Route exact path='/'
         element={
            <Main title="Bem Vindo!">
                <div>Cadastro de alunos, cursos e carômetro</div>
            </Main> }
    />
    
    <Route path='/Perfil' element={<Login/>} />
    <Route path='/Montadora' element={<Montadora />} />
    <Route path='/Veiculos' element={<Veiculos />} />
    <Route path='/Showroom' element={<Showroom />} />
    
        <Route path='*' element={
            <Main title="Bem Vindo!">
                <div>Página não encontrada</div>
            </Main>} />
    </Routes>
      
)
}