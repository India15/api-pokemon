import React from 'react';
import styles from './notFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.errorHeading}>Error 404</h1>
      <img src="./assets/d.gif" alt="GIF animado" className={styles.gifImage} />
    </div>
  );
};

export default NotFoundPage;
