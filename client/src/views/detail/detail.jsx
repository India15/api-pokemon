import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, clearData } from "../../redux/action";
import styles from "./detail.module.css"; 
const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const myPokemon = useSelector((state) => state.pokemonDetails);

  useEffect(() => {
    dispatch(getPokemonById(id));
    return () => {
      dispatch(clearData());
    };
  }, [dispatch, id]);

  const renderPokemonDetails = () => {
    if (myPokemon) {
      const {
        name,
        image,
        id,
        attack,
        defense,
        types,
        hp,
        speed,
        height,
        weight,
      } = myPokemon;

  
      return (
        <div className={styles.detailContainer}>
          <div className={styles.cardContainer}>
            <p className={styles.name}>{name ? name.toUpperCase() : "Unknown"}</p>
            <img src={image} alt="" className={styles.image} />
            <h3 className={styles.id}>Id:{id}</h3>
            <h4 className={styles.stat}>Attack: {attack}</h4>
            <h4 className={styles.stat}>Defense: {defense}</h4>
            <h4 className={styles.stat}>Hp: {hp}</h4>
            {speed && <h4 className={styles.stat}>Speed: {speed}</h4>}
            <div className={styles.typesContainer}>
              {types &&
                types.map((type, index) => (
                  <div key={index} className={styles.type}>
                    {type}
                  </div>
                ))}
            </div>
          </div>
          {height && <h4 className={styles.stat}>Height: {height}</h4>}
          {weight && <h4 className={styles.stat}>Weight: {weight}</h4>}
        
          <Link to="/home">
            <button className={styles.button}>Return</button>
          </Link>
        </div>
      );
    } else {
      return <p>Cargando...</p>;
    }
  };

  return <div>{renderPokemonDetails()}</div>;
};

export default Detail;