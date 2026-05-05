import { pokemonAPI } from "./components/api.js";
import createFrontCard from "./components/Cards/frontCard.js";
import createBackCard from "./components/Cards/backCard.js";
import { openCard, closeCard } from "./components/animation.js";

const scene = document.getElementById("scene");
const grid = document.getElementById("grid");
const overlay = document.getElementById("overlay");

pokemonAPI.loadPokemons(9).then((pokemons) => {
  pokemons.forEach((p) => {
    const wraps = document.createElement("div");
    wraps.className = "card-wrap";

    const frontCard = createFrontCard(p);
    const backCard = createBackCard(p);

    frontCard.addEventListener("click", () => {
      openCard(wraps, backCard);
      frontCard.classList.add("ghost");
    });

    backCard.addEventListener("click", () => {
      closeCard(overlay, backCard);
      frontCard.classList.remove("ghost");
      overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
      closeCard(overlay, backCard);
      frontCard.classList.remove("ghost");
      overlay.classList.remove("active");
    });

    grid.appendChild(frontCard);
  });
});
