import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemonByName, cerrarNavbar } from '../../redux/action';
import styles from './searchBar.module.css';

const SearchBar = () => {
  const regex = /^\w+$/;
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (regex.test(name)) {
      dispatch(getPokemonByName(name));
    } else {
      window.alert('La búsqueda debe contener caracteres válidos');
    }
  };

  return (
    <div className={styles.SearchBar}>
      <input
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className={styles.input_search}
        type="search"
        placeholder="Search"
      />
  <Link to="/search" onClick={() => dispatch(cerrarNavbar(false))}>
        <button className={styles.button_search} onClick={handleSearch} text="Search"> Search </button>
      </Link>
    </div>
  );
};

export default SearchBar;
