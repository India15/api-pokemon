const { Router } = require('express');

const getPokemons = require('../controllers/getPokemons')
const getPokemonById = require('../controllers/getPokemonById')
const getPokemonByName = require('../controllers/getPokemonByName')
const postPokemon = require('../controllers/postPokemon')
const getTypesPokemon = require('../controllers/getTypesPokemon')

const router = Router();

router.get('/pokemons/', getPokemons);
router.get('/pokemons/:idPokemon', getPokemonById);
router.get('/pokemons/name', getPokemonByName);
router.post('/pokemons', postPokemon);
router.get('/types', getTypesPokemon);


module.exports = router;
