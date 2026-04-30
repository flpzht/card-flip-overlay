import { pokemonAPI } from './components/api.js';
import createFrontCard from './components/card.js';

const podedex = document.getElementById('pokedex');
const scene   = document.getElementById('scene');
const grid    = document.getElementById('grid');
const overlay = document.getElementById('overlay');
let openWrap = null, openCardEl = null, ghost = null;

scene.addEventListener('click', e => {
    const wrap = e.target.closest('.card-wrap');
    if (!wrap) return;
    const cardEl = wrap.querySelector('.card');
    if (!cardEl) return;
    if (openWrap === wrap) {
        closeCard();
    } else {
        openCard(wrap, cardEl);
    }
});

pokemonAPI.loadPokemons(20).then(pokemons => {
    pokemons.forEach(p => {
        const card = createFrontCard(p);
        grid.appendChild(card);
    });
});

pokemonAPI.loadPokemons(2).then(console.log);