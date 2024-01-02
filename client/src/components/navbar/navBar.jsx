import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../navbar/navBar.module.css';
import SearchBar from '../searchbar/searchBar';


const Navbar = () => {
  const pokelogoPath = '/assets/pokelogo.png';
  return (
    <div className={style.navbar}>
      <NavLink to="/" className={style.logoLink}>
        <img src={pokelogoPath} alt="logo.png" className={style.logo} />
      </NavLink>
       <button className={style.button}>
        <NavLink to="/form" className={style.link}>
          Create
        </NavLink>
      </button>
   <SearchBar />
    </div>
  );
};

export default Navbar;

