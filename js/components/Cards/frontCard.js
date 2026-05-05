import { typeColors } from '../types.js';

export default function createFrontCard({ num, name, img, types }) {
const card = document.createElement('ul');
card.className = 'card';

const face = document.createElement('li');
face.className = 'face front';
face.style.backgroundColor = typeColors[types[0]] ? typeColors[types[0]].bg : '#eee';


const imgEl = document.createElement('img');
imgEl.className = 'f-img';
imgEl.src = img;
imgEl.alt = name;

const nameEl = document.createElement('span');
nameEl.className = 'f-name';
nameEl.textContent = name;


face.appendChild(imgEl);
face.appendChild(nameEl);

card.appendChild(face);

return card;
};