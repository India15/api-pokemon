const { Router } = require('express');

const getPokemons = require('../controllers/getPokemons')
const getPokemonById = require('../controllers/getPokemonById')
const getPokemonByName = require('../controllers/getPokemonByName')
const postPokemon = require('../controllers/postPokemon')
const getTypesPokemon = require('../controllers/getTypesPokemon')

const router = Router();

router.get('/pokemons/', getPokemons);
router.get('/pokemons/:idPokemon', getPokemonById);
// Rutas de la API
router.get('/pokemons/name', getPokemonByName);
; // Cambiado de '/pokemons/name' a '/pokemons'
router.post('/pokemons', postPokemon);
router.get('/types', getTypesPokemon);

module.exports = router;
