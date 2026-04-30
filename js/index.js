// Card Flip Overlay

/* Types */
const typeColors = {
  normal:   { bg:"#E8E8E0", color:"#6D6D4E" },
  fire:     { bg:"#FDEBD0", color:"#9C3A00" },
  water:    { bg:"#DAF0FF", color:"#0A5F8A" },
  electric: { bg:"#FFF9C4", color:"#7A6500" },
  grass:    { bg:"#DFF5DC", color:"#1E6B2E" },
  ice:      { bg:"#D6F5FF", color:"#1A6B80" },
  fighting: { bg:"#FDDCD8", color:"#8B1A10" },
  poison:   { bg:"#F3D6F5", color:"#6A1B6E" },
  ground:   { bg:"#F5EDD6", color:"#7A5500" },
  flying:   { bg:"#E0DEFF", color:"#3A2E8A" },
  psychic:  { bg:"#FFD6EA", color:"#8B0050" },
  bug:      { bg:"#E8F5D8", color:"#3A5A00" },
  rock:     { bg:"#EDE8D0", color:"#5A4A00" },
  ghost:    { bg:"#D6D0F0", color:"#2E1A6E" },
  dragon:   { bg:"#D0D8FF", color:"#0A1A8A" },
  dark:     { bg:"#D8D0C8", color:"#2C2416" },
  steel:    { bg:"#E0E8EE", color:"#2A4A5A" },
  fairy:    { bg:"#FFE0EE", color:"#8B1A50" },
};

const accentColors = ["#7F77DD","#1D9E75","#BA7517","#D85A30","#378ADD","#D4537E"];


/* Constants and state */
const scene   = document.getElementById('scene');
const grid    = document.getElementById('grid');
const overlay = document.getElementById('overlay');
let openWrap = null, openCardEl = null, ghost = null;

for (let i = 0; i < 6; i++) {
  const wrap = document.createElement('div');
  wrap.className = 'card-wrap';
  wrap.innerHTML = `<div class="card"><div class="face front"><div class="skeleton"></div></div><div class="face back"></div></div>`;
  grid.appendChild(wrap);
}

async function loadPokemon(id) {
  const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return r.json();
}

(async () => {
  const wraps    = [...grid.querySelectorAll('.card-wrap')];
  const pokemons = await Promise.all([1,2,3,4,5,6].map(loadPokemon));

  pokemons.forEach((p, i) => {
    const wrap   = wraps[i];
    const accent = accentColors[i];
    const types  = p.types.map(t => t.type.name);
    const img    = p.sprites.other['official-artwork'].front_default || p.sprites.front_default;
    const num    = String(p.id).padStart(3, '0');

    const card = wrap.querySelector('.card');
    card.innerHTML = `
      <div class="face front">
        <div class="f-accent" style="background:${accent}"></div>
        <img class="f-img" src="${img}" alt="${p.name}">
        <span class="f-name">${p.name}</span>
      </div>
      <div class="face back">
        <button class="b-close">×</button>
        <div class="b-num">#${num}</div>
        <img class="b-img" src="${img}" alt="${p.name}">
        <div class="b-name">${p.name}</div>
        <div class="b-types">
          ${types.map(t => {
            const tc = typeColors[t] || { bg:"#eee", color:"#333" };
            return `<span class="b-type" style="background:${tc.bg};color:${tc.color}">${t}</span>`;
          }).join('')}
        </div>
      </div>`;

    card.querySelector('.b-close').addEventListener('click', e => { e.stopPropagation(); closeCard(); });
    card.addEventListener('click', e => {
      if (e.target.classList.contains('b-close')) return;
      if (openCardEl) { closeCard(() => openNew(wrap, card)); }
      else openNew(wrap, card);
    });
  });
})();

overlay.addEventListener('click', closeCard);

function openNew(wrap, card) {
  const sceneRect = scene.getBoundingClientRect();
  const cardRect  = card.getBoundingClientRect();
  const relTop    = cardRect.top  - sceneRect.top;
  const relLeft   = cardRect.left - sceneRect.left;
  const w = cardRect.width, h = cardRect.height;

  ghost = document.createElement('div');
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
      openWrap = wrap; openCardEl = card;
    });
  });
}

function closeCard(cb) {
  if (!openCardEl) return;
  const card = openCardEl, wrap = openWrap;
  const sceneRect = scene.getBoundingClientRect();
  const ghostRect = ghost.getBoundingClientRect();
  const relTop  = ghostRect.top  - sceneRect.top;
  const relLeft = ghostRect.left - sceneRect.left;
  const w = ghost.offsetWidth, h = ghost.offsetHeight;

  card.style.cssText = `
    position:absolute;
    top:${relTop}px;left:${relLeft}px;
    width:${w}px;height:${h}px;
    transform:rotateY(0deg);
    transition:top 0.55s cubic-bezier(0.4,0,0.2,1),left 0.55s cubic-bezier(0.4,0,0.2,1),width 0.55s cubic-bezier(0.4,0,0.2,1),height 0.55s cubic-bezier(0.4,0,0.2,1),transform 0.55s cubic-bezier(0.4,0,0.2,1);
    z-index:20;`;
  overlay.classList.remove('active');
  openCardEl = null; openWrap = null;

  card.addEventListener('transitionend', function done() {
    card.removeEventListener('transitionend', done);
    card.style.cssText = '';
    wrap.appendChild(card);
    if (ghost) { ghost.remove(); ghost = null; }
    if (cb) cb();
  }, { once: true });
}