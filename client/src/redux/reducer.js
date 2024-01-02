import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  CLEAR_DATA,
  GET_PAGE_POKEMONS,
  CERRAR_NAVBAR,
  GET_TYPES,
  POST_POKEMON,
  ORDER_BY_NAME,
  ORDER_BY_STRENGTH,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  RESTORE
} from './actionsTypes'; 

const initialState = {
  pokemons: [],
  allPokemonsCache: [],
  allPokemons: [],
  showPokemons: [],
  searchPokemon: [],
  createPokemons: [],
  pokemonTypes: [],
  numberPage: 1,
  types: [],
  pokemonDetails: {},
  filteredPokemons: [],
  error: null,
  navbarVisible: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action; // Extrae type y payload

  switch (type) {
    case GET_POKEMONS:
      return { ...state, allPokemonsCache: [...payload], allPokemons: [...payload] };

    case GET_PAGE_POKEMONS:
      const pokemonPerPage = 12;
      const startIdx = (payload - 1) * pokemonPerPage;
      const endIdx = startIdx + pokemonPerPage;

      const updatedShowPokemons =
        state.allPokemons.length <= endIdx
          ? state.allPokemons.slice(startIdx)
          : state.allPokemons.slice(startIdx, endIdx);

      return { ...state, showPokemons: updatedShowPokemons, numberPage: payload };

    case GET_POKEMON_BY_NAME:
      const updatedSearchPokemon = Array.isArray(payload) ? payload : [payload];
      return { ...state, allPokemonsCache: [...updatedSearchPokemon], searchPokemon: updatedSearchPokemon };

    case GET_POKEMON_BY_ID:
 
      return { ...state, pokemonDetails: payload };
    
      case POST_POKEMON:
        return {
          ...state,
          allPokemonsCache: [...state.allPokemonsCache, payload],
          allPokemons: [...state.allPokemons, { ...payload, createdInDb: true }],
          createPokemons: [...state.createPokemons, { ...payload, createdInDb: true }],
        };
      
    case GET_TYPES:
      return { ...state, pokemonTypes: payload };

    case CLEAR_DATA:
      return { ...state, searchPokemon: [] };

    case CERRAR_NAVBAR:
      return { ...state, navbarVisible: payload }; // Usar payload en lugar de action.payload

    case ORDER_BY_NAME:
      const sortedNames = [...state.allPokemons].sort((a, b) => {
        return action.payload === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });

      return {
        ...state,
        allPokemons: sortedNames,
      };

    case ORDER_BY_STRENGTH:
      const sortedStrength = [...state.allPokemons].sort((a, b) => {
        return action.payload === 'strongest' ? b.attack - a.attack : a.attack - b.attack;
      });

      return {
        ...state,
        allPokemons: sortedStrength,
      };
case FILTER_BY_ORIGIN:
  const propertyName = 'created';
  
  // Verificar si la propiedad existe en al menos un Pokemon
  const isPropertyAvailable = state.allPokemons.length > 0 &&
    propertyName in state.allPokemons[0];
  
  let filteredByOrigin;
  
  if (isPropertyAvailable) {
    filteredByOrigin = action.payload === 'created by User' ?
      state.allPokemons.filter((pokemon) => pokemon[propertyName]) :
      state.allPokemons.filter((pokemon) => !pokemon[propertyName]);
  } else {
    // Manejar el caso en que la propiedad no está presente en los Pokemon
    console.error(`La propiedad ${propertyName} no está presente en los objetos Pokémon.`);
    filteredByOrigin = state.allPokemons;
  }
  
  return {
    ...state,
    allPokemons: action.payload === 'all' ? state.allPokemons : filteredByOrigin,
  };

    case FILTER_BY_TYPE:
      const filteredByType = action.payload === 'all' ?
        state.allPokemons :
        state.allPokemons.filter((pokemon) => pokemon.types.includes(action.payload));

      return {
        ...state,
        allPokemons: filteredByType,
      };

    case RESTORE:
      return {
        ...state,
        allPokemons: state.filteredPokemons,
        addedPokemons: [],
      };

    default:
      return state;
  }
};

export default reducer;
