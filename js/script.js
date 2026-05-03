import { pokemonAPI } from './components/api.js';
import createFrontCard from './components/Cards/frontCard.js';
import createBackCard from './components/Cards/backCard.js';


const scene   = document.getElementById('scene');
const grid    = document.getElementById('grid');
const overlay = document.getElementById('overlay');

pokemonAPI.loadPokemons(6).then(pokemons => {
    pokemons.forEach(p => {
        const wraps = document.createElement('div');
        wraps.className = 'card-wrap';

        const frontCard = createFrontCard(p);
        const backCard = createBackCard(p);
        
        frontCard.addEventListener('click', () => {
            backCard.classList.add('popup--active');
            backCard.classList.remove('ghost');            
            overlay.classList.add('active');
            overlay.appendChild(backCard);
        })

        wraps.appendChild(frontCard);
        grid.appendChild(wraps);
    });
});

overlay.addEventListener('click', () => {
document.querySelectorAll('.card.popup--active')
.forEach(c => c.classList.remove('popup--active'));
overlay.classList.remove('active');
});

function openNew(wrap, card) {
    const sceneRect = scene.getBoundingClientRect();
    const cardRect  = card.getBoundingClientRect();
    const relTop    = cardRect.top  - sceneRect.top;
    const relLeft   = cardRect.left - sceneRect.left;
    const w = cardRect.width, h = cardRect.height;

    const ghost = document.createElement('div');
    ghost.className = 'card ghost';
    ghost.style.cssText = `width:${w}px;height:${h}px;`;
    wrap.appendChild(ghost);

    card.style.cssText = `position:absolute;top:${relTop}px;left:${relLeft}px;width:${w}px;height:${h}px;transition:none;`;
    scene.appendChild(card);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const popW = Math.min(230, sceneRect.width * 0.55);
            const popH = popW * (4 / 3);
            const targetTop  = (sceneRect.height - popH) / 2;
            const targetLeft = (sceneRect.width  - popW) / 2;
        
            card.style.cssText = `
                position:absolute;
                top:${targetTop}px;left:${targetLeft}px;
                width:${popW}px;height:${popH}px;
                transform:rotateY(180deg);
                transition:top 0.65s cubic-bezier(0.4,0,0.2,1),left 0.65s cubic-bezier(0.4,0,0.2,1),width 0.65s cubic-bezier(0.4,0,0.2,1),height 0.65s cubic-bezier(0.4,0,0.2,1),transform 0.65s cubic-bezier(0.4,0,0.2,1);
                z-index:20;`;
            overlay.classList.add('active');
        });
    });
}