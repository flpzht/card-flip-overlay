import { pokemonAPI } from "./components/api.js";
import createFrontCard from "./components/Cards/frontCard.js";
import createBackCard from "./components/Cards/backCard.js";
import { openCard, closeCard } from "./components/animation.js";

const scene = document.getElementById("scene");
const grid = document.getElementById("grid");
const overlay = document.getElementById("overlay");
const input = document.getElementById("pokemon-list");
const button = document.querySelector(".header__button");

const num = parseInt(input.value || 150);
pokemonAPI.loadPokemons(num).then((pokemons) => {
  grid.replaceChildren(); // Limpa os cards existentes
  pokemons.forEach((p) => {
    const frontCard = createFrontCard(p);
    const backCard = createBackCard(p);

    frontCard.addEventListener("click", () => {
      openCard(overlay, backCard);
      frontCard.classList.add("ghost");
    });

    backCard.addEventListener("click", () => {
      closeCard(overlay, backCard, frontCard);
    });

    overlay.addEventListener("click", () => {
      closeCard(overlay, backCard, frontCard);
    });

    grid.appendChild(frontCard);
  });
});
