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
  pokemonsCache: [],
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
  const { type, payload } = action; 

  switch (type) {
    case GET_POKEMONS:
      return { ...state, 
        allPokemons: [...payload],
        pokemonsCache: [...payload], };

    case GET_PAGE_POKEMONS:
      const pokemonPerPage = 12;
      const startIndex= (payload - 1) * pokemonPerPage;
      const endIdx = startIndex + pokemonPerPage;

      const updatedShowPokemons =
        state.allPokemons.length <= endIdx
          ? state.allPokemons.slice(startIndex)
          : state.allPokemons.slice(startIndex, endIdx);

      return { ...state, showPokemons: updatedShowPokemons, numberPage: payload };

    case GET_POKEMON_BY_NAME:
      const updatedSearchPokemon = Array.isArray(payload) ? payload : [payload];
      return { ...state, searchPokemon: updatedSearchPokemon };

    case GET_POKEMON_BY_ID:
       return { ...state, pokemonDetails: payload };
    
      case POST_POKEMON:
        return {
          ...state,
          pokemonsCache: [...state.pokemonsCache, payload],
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
        const isPropertyAvailable = state.allPokemons.length > 0 &&
          propertyName in state.allPokemons[0];
      
        let filteredByOrigin;
      
        if (isPropertyAvailable) {
          if (action.payload === 'created by User') {
            filteredByOrigin = state.allPokemons.filter((pokemon) => pokemon[propertyName]);
          } else if (action.payload === 'all') {
            console.log('Show all selected, reverting to the original state.');
            console.log('Pokemons in state:', state.allPokemons);
            console.log('Pokemons in cache:', state.pokemonsCache);
            return {
              ...state,
              allPokemons: state.pokemonsCache.filter((pokemon) => !pokemon[propertyName]), // Solo toma los de la API
            };
          } else {
            filteredByOrigin = state.allPokemons.filter((pokemon) => !pokemon[propertyName]);
          }
        } else {
          console.error(`La propiedad ${propertyName} no está presente en los objetos Pokémon.`);
          filteredByOrigin = state.allPokemons;
        }
      
        console.log('Filtered by Origin:', action.payload, 'Result:', filteredByOrigin);
      
        return {
          ...state,
          allPokemons: filteredByOrigin,
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
