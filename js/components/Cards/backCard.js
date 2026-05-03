import { typeColors, accentColors } from '../types.js';

export default function createBackCard({ num, name, img, types }) {

const handleCloseCard = (element) => {
  element.classList.remove('popup--active');
  element.classList.add('ghost');
};

const backCard = document.createElement('div');
backCard.className = 'card ghost';

backCard.addEventListener('click', () => {
  handleCloseCard(backCard);
  document.getElementById('overlay').classList.remove('active');
});

const back = document.createElement('div');
back.className = 'face back';

const btnClose = document.createElement('button');
btnClose.className = 'b-close';
btnClose.textContent = 'X';

btnClose.addEventListener('click', () => {
  handleCloseCard(backCard);
  document.getElementById('overlay').classList.remove('active');
});

const accent = document.createElement('div');
accent.className = 'b-accent';
accent.style.backgroundColor = accentColors[types[0]] ? accentColors[types[0]].bg : '#eee';

const imgEl = document.createElement('img');
imgEl.className = 'b-img';
imgEl.src = img;
imgEl.alt = name;

const nameEl = document.createElement('span');
nameEl.className = 'b-name';
nameEl.textContent = name;

const typesEl = document.createElement('span');
typesEl.className = 'b-types';

const typeSpans = types.map(t => {
  const typeSpan = document.createElement('span');
  typeSpan.className = 'b-type';
  typeSpan.textContent = t;
  typeSpan.style.color = typeColors[t] ? typeColors[t].color : '#333';
  typeSpan.style.backgroundColor = typeColors[t] ? typeColors[t].bg : '#eee';
  return typeSpan;
});

const numberEl = document.createElement('span');
numberEl.className = 'b-num';
numberEl.textContent = `#${String(num).padStart(3, '0')}`;

back.appendChild(btnClose);
back.appendChild(accent);
back.appendChild(numberEl);
back.appendChild(imgEl);
back.appendChild(nameEl);
typesEl.append(...typeSpans);
back.appendChild(typesEl);

backCard.appendChild(back);

return backCard;
};