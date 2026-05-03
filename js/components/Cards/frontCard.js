import { typeColors } from '../types.js';

export default function createFrontCard({ num, name, img, types }) {
const card = document.createElement('div');
card.className = 'card';

const face = document.createElement('div');
face.className = 'face front';
face.style.backgroundColor = typeColors[types[0]] ? typeColors[types[0]].bg : '#eee';

const accent = document.createElement('div');
accent.className = 'f-accent';
accent.style.backgroundColor = typeColors[types[0]] ? typeColors[types[0]].bg : '#eee';

const imgEl = document.createElement('img');
imgEl.className = 'f-img';
imgEl.src = img;
imgEl.alt = name;

const nameEl = document.createElement('span');
nameEl.className = 'f-name';
nameEl.textContent = name;

const typesEl = document.createElement('span');
typesEl.className = 'f-types';

const typeSpans = types.map(t => {
  const typeSpan = document.createElement('span');
  typeSpan.className = 'f-type';
  typeSpan.textContent = t;
  typeSpan.style.color = typeColors[t] ? typeColors[t].color : '#333';
  typeSpan.style.backgroundColor = typeColors[t] ? typeColors[t].bg : '#eee';
  return typeSpan;
});

const numberEl = document.createElement('span');
numberEl.className = 'f-num';
numberEl.textContent = `#${String(num).padStart(3, '0')}`;


typesEl.append(...typeSpans);

face.appendChild(accent);
face.appendChild(numberEl);
face.appendChild(imgEl);
face.appendChild(nameEl);
face.appendChild(typesEl);

card.appendChild(face);

return card;
};