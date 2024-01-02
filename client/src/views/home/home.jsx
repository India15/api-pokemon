import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { getPokemons, getTypes, getPagePokemons, orderByName, orderByStrength, filterByType, filterByOrigin, restore } from '../../redux/action';
import styles from './home.module.css';
import Cards from '../../components/cards/cards';

const Home = () => {
 const dispatch = useDispatch();
 const [order, setOrder] = useState('');
 const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    dispatch(getPagePokemons(1));
  }, [dispatch]);

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Alphabetical ${e.target.value} order`);
    setCurrentPage(1);
  }

  function handleSortAttack(e) {
    e.preventDefault();
    dispatch(orderByStrength(e.target.value));
    setOrder(`Ordered by ${e.target.value} Pokemon`);
    setCurrentPage(1);
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setOrder(`Filtered by Type: ${e.target.value}`);
  }

  function handleFilterByOrigin(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    setOrder(`Filtered by Origin: ${e.target.value}`);
  }

  // Nueva función para restaurar
  const handleRestore = () => {
    dispatch(restore());
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.filtersContainer}>
      <form className={styles.filters}> 
        <select className= {`${styles.homeFilters} ${styles.button}`}  value='' onChange={e => handleSort(e)}>
          <option disabled value="">Order/Name</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>


        <select className= {`${styles.homeFilters} ${styles.button}`} value='' onChange={e => handleSortAttack(e)}>
          <option disabled value="">Order/Strength...</option>
          <option value="strongest"> + attack</option>
          <option value="weakest"> - attack</option>
        </select>

        <select className= {`${styles.homeFilters} ${styles.button}`}  value='' onChange={e => handleFilterType(e)}>
          <option className={styles.select} disabled value="">Filter/Type</option>
          <option value='all'>All</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select>

        <select className= {`${styles.homeFilters} ${styles.button}`}  value='' onChange={e => handleFilterByOrigin(e)}>
          <option disabled value="">Filter/Origin</option>
          <option value="all">Show all...</option>
          <option value="originals">Originals...</option>
          <option value="created by User">Created By User...</option>
        </select>

     
        <button onClick={handleRestore}>Restore</button>

        {order.length > 0 && (<span className={styles.filtered}>{order}</span>)}
      </form>
      </div>
<div className={styles.CardsContainer}>
      <div className={styles.Cards}>
        <Cards />
      </div>
    </div>
    </div>
  );
};

export default Home;
