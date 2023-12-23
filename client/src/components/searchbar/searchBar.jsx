import { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemonByName, cerrarNavbar } from "../../redux/action";
import styles from "./searchBar.module.css";

const SearchBar = () => {
  const regex = /^\w+$/;
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const handleClick = () => {
    if (regex.test(name)) {
      dispatch(getPokemonByName(name));
      dispatch(cerrarNavbar(false));  // Cierra la barra de navegación al hacer clic en Search
    } else {
      window.alert('La búsqueda debe contener solo letras y números');
    }
  }

  return (
    <div className={styles.SearchBar}>
      <input 
        onChange={handleChange} 
        className={styles.input_search} 
        type="search" 
        name="" 
        placeholder='Search'
      />
      <Link to={`pokemons/name?name=${name}`} className={styles.button_search}>
        <button onClick={handleClick} className={styles.button_search}>Search</button>
      </Link>
    </div>
  );
}

export default SearchBar;
