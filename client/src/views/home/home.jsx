// home.jsx

import React from 'react';
import styles from './home.module.css';
import Cards from '../../components/cards/cards';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div>
        <Cards />
      </div>
    </div>
  );
};

export default Home;
