import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {clearData, cerrarNavbar} from "../../redux/action";
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
        <div className={styles.Cards} onClick={() => dispatch(cerrarNavbar(false))}>
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
    </div>
    )
}

export default Search