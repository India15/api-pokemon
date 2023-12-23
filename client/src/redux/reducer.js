import * as actions from "./actionsTypes";

const initialState = {
  pokemons: [],
  allPokemonsCache:[],
  allPokemons: [],
  showPokemons: [],
  searchPokemon:[],
  numberPage: 1,
  types: [],
  detail: [],
  error: null,
  navbarVisible: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_POKEMONS:
      return { ...state, allPokemonsCache: [...action.payload], allPokemons: [...action.payload] };


  case actions.GET_PAGE_POKEMONS:
  const pokemonPerPage = 12;
  const startIdx = (action.payload - 1) * pokemonPerPage;
  const endIdx = startIdx + pokemonPerPage;

  const updatedShowPokemons =
    state.allPokemons.length <= endIdx
      ? state.allPokemons.slice(startIdx)
      : state.allPokemons.slice(startIdx, endIdx);

  return { ...state, showPokemons: updatedShowPokemons, numberPage: action.payload };

  case actions.GET_POKEMON_BY_NAME:
    return { ...state, searchPokemon: action.payload };
  


case actions.CLEAR_DATA:
  return { ...state, searchPokemon: [] };

    
    
      case actions.GET_POKEMON_ID:
      return {
        ...state,
        detail: action.payload,
      };

    case actions.POST_POKEMON:
      return {
        ...state,
      };

    case actions.FILTERS:
      try {
        const sortedPokemons = [...state.allPokemons];

        if (action.payload.sortSelect === "nameAsc") {
          sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
        } else if (action.payload.sortSelect === "nameDesc") {
          sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
        } else if (action.payload.sortSelect === "attAsc") {
          sortedPokemons.sort((a, b) => b.attack - a.attack);
        } else if (action.payload.sortSelect === "attDesc") {
          sortedPokemons.sort((a, b) => a.attack - b.attack);
        }

        const filteredByType = action.payload.typeSelect === "All"
          ? sortedPokemons
          : sortedPokemons.filter(
            (pokemon) => pokemon.types.some((type) => type.name === action.payload.typeSelect)
          );

        const filteredByCreated = action.payload.createdSelect === "All"
          ? filteredByType
          : action.payload.createdSelect === "created"
            ? filteredByType.filter((pokemon) => typeof pokemon.id !== "number")
            : filteredByType.filter((pokemon) => typeof pokemon.id === "number");

        if (filteredByCreated.length === 0) {
          throw new Error("No Pokemon of such type");
        }

        return {
          ...state,
          pokemons: filteredByCreated,
          error: null,
        };
      } catch (error) {
        return {
          ...state,
          error: error.message,
        };
      }


      case actions.CERRAR_NAVBAR:
  return { ...state, navbarVisible: action.payload }; // Usar action.payload en lugar de payload


    default:
      return state;
  }
};

export default reducer;
