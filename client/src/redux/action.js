import axios from "axios";
import {
  GET_POKEMONS,
  GET_TYPES,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_ID,
  CLEAR_DATA,
  FILTERS,
  GET_PAGE_POKEMONS,
  CERRAR_NAVBAR
} from './actionsTypes'; 

export const filterAndOrder = (sortSelect, typeSelect, createdSelect) => ({
  type: FILTERS,
  payload: { sortSelect, typeSelect, createdSelect },
});


export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/pokemons");
      dispatch({
        type: GET_POKEMONS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
// En actions.js o donde tengas definida tu acción getPagePokemons
// En tu acción getPagePokemons
export const getPagePokemons = (numberPage) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemons?page=${numberPage}&limit=12`);
      console.log("Data from API:", data); // Agrega este log para verificar los datos
      dispatch({
        type: GET_PAGE_POKEMONS,
        payload: {
          pokemons: data.results,
          currentPage: numberPage,
          totalPages: Math.ceil(data.count / 12),
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};


// En tu acción getPokemonNameexport const getPokemonByName = (name) => {
  export const getPokemonByName = (name) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`);
        return dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: data,
        });
      } catch (error) {
        window.alert(JSON.stringify(error.response.data));
      }
      
    };
  };
  


export const clearData = () => {
  return {
      type: CLEAR_DATA
  }
}


export const getTypes = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/types");
    dispatch({
      type: GET_TYPES,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
  }
};


export const getPokemonById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/pokemon/${id}`);
    dispatch({
      type: GET_POKEMON_ID,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
    // Consider displaying the error on the UI instead of using alert
  }
};

export const postPokemon = (payload) => async () => {
  try {
    const { data } = await axios.post("/pokemon");
    console.info("Pokemon created");
    return data;
  } catch (error) {
    console.error(error.message);
    // Consider displaying the error on the UI instead of using alert
  }
};


export const cerrarNavbar = (value) => {
  return {
      type: CERRAR_NAVBAR,
      payload: value
  };
};



