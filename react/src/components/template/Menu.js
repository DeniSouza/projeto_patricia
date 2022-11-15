import './Menu.css';
import React from 'react';
import {Link} from 'react-router-dom';

export default function Menu(props){
    return(
        <nav className='menu'>
            <Link to="/Perfil">
                Perfil
            </Link>
            <Link to="/Montadora">
                Montadora
            </Link>
            <Link to="/Veiculos">
                Veículos
            </Link>
            <Link to= "/Showroom">
                Showroom
            </Link>
        </nav>
    )
}