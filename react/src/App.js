import './App.css';
import React, { Component, useEffect, useState, createContext } from 'react';
import Logo from './components/template/Logo';
import Menu from './components/template/Menu';
import Main from './components/template/Main';
import Footer from './components/template/Footer';
import CrudAluno from './components/CrudAluno/CrudAluno';
import CrudCurso from './components/CrudCurso/CrudCurso';
import Rotas from './Rotas';
import { BrowserRouter } from 'react-router-dom';
export default function App() {
  
  return (  
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Menu />
        <Rotas />
        <Footer />
      </div>
    </BrowserRouter>
  );
  }
