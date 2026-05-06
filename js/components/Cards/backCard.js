import { typeColors, accentColors } from "../types.js";

export default function createBackCard({ num, name, img, types }) {

  const backCard = document.createElement("div");
  backCard.className = "b-card";


  const accent = document.createElement("div");
  accent.className = "b-accent";
  accent.style.backgroundColor = accentColors[types[0]]
    ? accentColors[types[0]].bg
    : "#eee";

  const imgEl = document.createElement("img");
  imgEl.className = "b-img";
  imgEl.src = img;
  imgEl.alt = name;

  const nameEl = document.createElement("span");
  nameEl.className = "b-name";
  nameEl.textContent = name;

  const typesEl = document.createElement("div");
  typesEl.className = "b-types";

  const typeSpans = types.map((t) => {
    const typeSpan = document.createElement("span");
    typeSpan.className = "b-type";
    typeSpan.textContent = t;
    typeSpan.style.color = typeColors[t] ? typeColors[t].color : "#333";
    typeSpan.style.backgroundColor = typeColors[t] ? typeColors[t].bg : "#eee";
    return typeSpan;
  });

  const numberEl = document.createElement("span");
  numberEl.className = "b-num";
  numberEl.textContent = `#${String(num).padStart(3, "0")}`;

  typesEl.append(...typeSpans);


  backCard.appendChild(accent);
  backCard.appendChild(numberEl);
  backCard.appendChild(imgEl);
  backCard.appendChild(nameEl);
  backCard.appendChild(typesEl);

  return backCard;
}
