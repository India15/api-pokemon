import axios from "axios";
import {
  GET_POKEMONS,
  GET_TYPES,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  CLEAR_DATA,
  GET_PAGE_POKEMONS,
  CERRAR_NAVBAR,
  POST_POKEMON,
  ORDER_BY_NAME,
  ORDER_BY_STRENGTH,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  RESTORE,
} from './actionsTypes';

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/pokemons");
      dispatch({
        type: GET_POKEMONS,
        payload: data,
      });
    } catch (error) {
      console.error( error.message);
    }
  };
};

export const getPagePokemons = (numberPage) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemons?page=${numberPage}&limit=12`);
   
      dispatch({
        type: GET_PAGE_POKEMONS,
        payload: {
          pokemons: data.results,
          currentPage: numberPage,
          totalPages: Math.ceil(data.count / 12),
        },
      });
    } catch (error) {
      console.error( error.message);
    }
  };
};

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemons/${name}`);
     

      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: data,
      });
    } catch (error) {
      window.alert("Error en la solicitud:", error);

      if (error.response) {
  
        window.alert("Ocurrió un error al obtener el Pokémon. Por favor, inténtalo de nuevo más tarde.");
      } else if (error.request) {
     
        window.alert("Ocurrió un error al comunicarse con el servidor. Por favor, inténtalo de nuevo más tarde.");
      } else {
      
        window.alert("Ocurrió un error. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  };
};

export const getPokemonById = (id) => async (dispatch) => {
  try {
  
    const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`);
  
    dispatch({
      type: GET_POKEMON_BY_ID,
      payload: data,
    });

  } catch (error) {
    console.error('Error fetching Pokemon by ID:', error.message);
  }
};

export const clearData = () => {
  return {
    type: CLEAR_DATA
  };
};

export const getTypes = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3001/types");
    console.log(data);
    dispatch({
      type: GET_TYPES,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("http://localhost:3001/pokemons", pokemon);
      return dispatch({
        type: POST_POKEMON,
        payload: data,
      });
    } catch (error) {
      console.error("Error al crear el Pokémon:", error);
    }
  };
};

export const cerrarNavbar = (value) => {
  return {
    type: CERRAR_NAVBAR,
    payload: value
  };
};

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload
  };
}

export function orderByStrength(payload) {
  return {
    type: ORDER_BY_STRENGTH,
    payload
  };
}

export function filterByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload
  };
}

export function filterByOrigin(payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload
  };
}

export const restore = () => {
  return {
    type: RESTORE
  };
};
