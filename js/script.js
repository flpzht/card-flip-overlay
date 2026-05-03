import { pokemonAPI } from './components/api.js';
import createFrontCard from './components/Cards/frontCard.js';
import createBackCard from './components/Cards/backCard.js';


const scene   = document.getElementById('scene');
const grid    = document.getElementById('grid');
const overlay = document.getElementById('overlay');
let openWrap = null, openCardEl = null, ghost = null;

pokemonAPI.loadPokemons(6).then(pokemons => {
    pokemons.forEach(p => {
        const card = createFrontCard(p);
        grid.appendChild(card);
    });
});

pokemonAPI.loadPokemons(6).then(pokemons => {
    pokemons.forEach(p => {
        const card = createBackCard(p);
        grid.appendChild(card);
    });
});