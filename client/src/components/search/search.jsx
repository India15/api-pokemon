import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {clearData, cerrarNavbar} from "../../redux/actions";
import Card from "../../components/card/card";
import styles from "./search.module.css"


const Search = () => {
  const dispatch = useDispatch()
  const searchPokemon = useSelector(state => state.searchPokemon)

  useEffect(() => {
      return () => {
          dispatch(clearData())
      };
  },[])
  return (
    <div className={styles.Cards} onClick={() => dispatch(cerrarNavbar(false))}>
      <div className={styles.container_cards}>
        {searchPokemon.length >= 1 ? (
          searchPokemon.map((pokemon) => (
            <Card
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))
        ) : (
          <p>No se encontraron Pokémon con el nombre especificado.</p>
        )}
      </div>
    </div>
  );
        }
        
  export default Search 