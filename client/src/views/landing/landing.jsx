// Landing.js

import React from 'react';
import styles from './landing.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Pokédex</h1>
      <div className={styles.gif}>
        <img src="./assets/C.gif" alt='GIF animado' className={styles.gifImage} />
      </div>

      <div>
        <button className={styles.btn}>
          <a href='/home' className={styles.link}>START</a>
        </button>
      </div>
    </div>
  );
}

export default Landing;
