// card.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './card.module.css';
import { useDispatch } from 'react-redux';
import { getPokemonById } from '../../redux/action'; 

const typeIcons = {
  all: "🌐",
  normal: "🤷‍♂️",
  fighting: "🥊",
  flying: "🦅",
  poison: "☠️",
  ground: "🏞️",
  rock: "🗿",
  bug: "🐞",
  ghost: "👻",
  steel: "🛡️",
  fire: "🔥",
  water: "💧",
  grass: "🌿",
  electric: "⚡",
  psychic: "🔮",
  ice: "❄️",
  dragon: "🐉",
  dark: "🌑",
  fairy: "🧚",
  unknown: "❓",
  shadow: "👥",
};

const Card = ({ id, name, image, types }) => {
  console.log("ID:", id);

  const dispatch = useDispatch();

  const handleDetailClick = () => {
    dispatch(getPokemonById(id));
  };

  return (
    <div className={styles.cardContainer}>
     <Link to={`/detail/${id}`} className={styles.link}>
        <img src={image} alt={name} className={styles.img} />
      </Link>
      <div className={styles.info_pokemon}>
        <h2 className={styles.name}>{name?.toUpperCase()}</h2>
        <div className={styles.types_pokemon}>
          {types?.map((type, index) => (
            <span key={index} className={styles.types_pokemon1}>
              {typeIcons[type]} {type}
            </span>
          ))}
        </div>
        <Link to={`/detail/${id}`} className={styles.infoLink}>
          <button className={styles.button_search} onClick={handleDetailClick}>
            Detail
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;