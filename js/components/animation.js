function openCard(wrap, card) {
    const sceneRect = scene.getBoundingClientRect();
    const cardRect  = card.getBoundingClientRect();
    const relTop    = cardRect.top  - sceneRect.top;
    const relLeft   = cardRect.left - sceneRect.left;
    const w = cardRect.width, h = cardRect.height;

    const ghost = document.createElement('div');
    ghost.className = 'b-card ghost';
    ghost.style.cssText = `width:${w}px;height:${h}px;`;
    wrap.appendChild(ghost);

    card.style.cssText = `position:absolute;top:${relTop}px;left:${relLeft}px;width:${w}px;height:${h}px;transition:none;`;
    overlay.appendChild(card);

    
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
}

function closeCard(grid, card) {
    grid.removeChild(card);
  
}

export { openCard, closeCard };