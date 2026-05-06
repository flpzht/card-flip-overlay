import { pokemonAPI } from "./components/api.js";
import createFrontCard from "./components/Cards/frontCard.js";
import createBackCard from "./components/Cards/backCard.js";
import { openCard, closeCard } from "./components/animation.js";

const grid = document.getElementById("grid");
const overlay = document.getElementById("overlay");
const input = document.getElementById("pokemon-list");
const button = document.querySelector(".header__button");

button.addEventListener("click", () => {
  const num = parseInt(input.value || 151);

  pokemonAPI.loadPokemons(num).then((pokemons) => {
    grid.replaceChildren();

    pokemons.forEach((p) => {
      const frontCard = createFrontCard(p);
      const backCard = createBackCard(p);


      frontCard.addEventListener("click", () => {

        const cardRect = frontCard.getBoundingClientRect();

        const ghost = document.createElement("div");
        ghost.className = "ghost";
        ghost.style.cssText = `
    width: ${frontCard.offsetWidth}px;
    height: ${frontCard.offsetHeight}px;`;

        frontCard.replaceWith(ghost);
        openCard(overlay, frontCard, backCard, cardRect);

        const handleClose = () => {
          closeCard(ghost);
          overlay.removeEventListener("click", handleClose);
          backCard.removeEventListener("click", handleClose);
        };

        overlay.addEventListener("click", handleClose);
        backCard.addEventListener("click", handleClose);
      });

      grid.appendChild(frontCard);
    });
  });
});
