// card.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ id, name, image, types }) => {
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.id}># {id}</h3>
      <Link to={`/home/${id}`} className={styles.link}>
        <img src={image} alt={name} className={styles.img} />
      </Link>
      <div className={styles.info_pokemon}>
        <h2 className={styles.name}>{name?.toUpperCase()}</h2>
        <div className={styles.types_pokemon}>
          {types?.map((type, index) => (
            <span key={index} className={styles.types_pokemon1}>
              <img
                src={`../../assets/img/labels/${type.name}.png`}
                alt={type.name}
                className={styles.typeLabel}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;


