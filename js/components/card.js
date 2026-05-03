function createFrontCard({ num, name, img, types }) {
const card = document.createElement('div');
card.className = 'card';

const face = document.createElement('div');
face.className = 'face front';

const accent = document.createElement('div');
accent.className = 'f-accent';

const imgEl = document.createElement('img');
imgEl.className = 'f-img';
imgEl.src = img;
imgEl.alt = name;

const nameEl = document.createElement('span');
nameEl.className = 'f-name';
nameEl.textContent = name;

const typesEl = document.createElement('span');
typesEl.className = 'f-types';
typesEl.textContent = types.join(' ');

const numberEl = document.createElement('span');
numberEl.className = 'f-num';
numberEl.textContent = `#${String(num).padStart(3, '0')}`;

face.appendChild(accent);
face.appendChild(numberEl);
face.appendChild(imgEl);
face.appendChild(nameEl);
face.appendChild(typesEl);

card.appendChild(face);

return card;
};

export default createFrontCard;