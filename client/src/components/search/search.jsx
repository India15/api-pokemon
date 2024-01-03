import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {clearData} from "../../redux/action";
import styles from "./search.module.css";
import Card from "../../components/card/card";


const Search = () => {
    const dispatch = useDispatch()
    const searchPokemon = useSelector(state => state.searchPokemon)

    useEffect(() => {
        return () => {
            dispatch(clearData())
        };
    },[])
    return (
        <div className={styles.Cards}>
            <div className={styles.container_cards}>
            {
                searchPokemon.length >= 1?searchPokemon.map(pokemon => {
                    return <Card
                    id={pokemon.id} 
                    key={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image} 
                    types={pokemon.types}
                    />
                }):
                <p>No hay pokemones para mostrar.</p>
            }
        </div>
        <Link to="/home">
            <button className={styles.button}>Return</button>
          </Link>
    </div>
    )
}

export default Search