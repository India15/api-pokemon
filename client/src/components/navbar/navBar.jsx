import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../navbar/navBar.module.css';
import Search from '../searchbar/searchBar';

const Navbar = () => {
  const pokelogoPath = '/assets/pokelogo.png';
  return (
    <div className={style.navbar}>
      <NavLink to="/" className={style.logoLink}>
        <img src={pokelogoPath} alt="logo.png" className={style.logo} />
      </NavLink>

      <Search />

      <button className={style.button}>
        <NavLink to="/create" className={style.link}>
          Crear
        </NavLink>
      </button>
   
    </div>
  );
};

export default Navbar;

