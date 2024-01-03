import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/action"; 
import Card from "../card/card";
import styles from "./cards.module.css";


const Cards = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 12;

  useEffect(() => {
    dispatch(getPokemons());
  }, []); //llamado de los pokemons

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const totalPages = Math.ceil(allPokemons.length / pokemonPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={styles.Cards}>
      <div className={styles.container_cards}>
        {currentPokemons.length >= 1 ? (
          currentPokemons.map((pokemon) => (
            <Card
              created={pokemon.created}
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))
        ) : (
          <p>No hay Pokémon para mostrar.</p>
        )}
      </div>

      <div className={styles.numberPage_container}>
        <button
          className={styles.button_prevnext}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        
        <p className={styles.numberPage}>{currentPage}</p>
        <button
          className={styles.button_prevnext}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;