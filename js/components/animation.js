function openCard(div, card) {
    const cardRect = card.getBoundingClientRect();

    // inicial: fixed com coordenadas da janela, sem transição
    card.style.cssText = `
        position: fixed;
        top: ${cardRect.top}px;
        left: ${cardRect.left}px;
        width: ${cardRect.width}px;
        height: ${cardRect.height}px;
        transition: none;
        z-index: 20;`;
    overlay.appendChild(card);

    requestAnimationFrame(() => requestAnimationFrame(() => {
        const popW = Math.min(350, window.innerWidth * 0.55);
        const popH = popW * (4 / 3);
        const targetTop  = (window.innerHeight - popH) / 2;
        const targetLeft = (window.innerWidth  - popW) / 2;

        card.style.cssText = `
            position: fixed;
            top: ${targetTop}px;
            left: ${targetLeft}px;
            width: ${popW}px;
            height: ${popH}px;
            transform: rotateY(180deg);
            transform-style: preserve-3d;
            transition:
                top 0.85s cubic-bezier(0.4,0,0.2,1),
                left 0.85s cubic-bezier(0.4,0,0.2,1),
                width 0.85s cubic-bezier(0.4,0,0.2,1),
                height 0.85s cubic-bezier(0.4,0,0.2,1),
                transform 0.85s cubic-bezier(0.4,0,0.2,1);
            z-index: 20;`;
        overlay.classList.add('active');
    }));
}

function closeCard(div, bcard, fcard) {
    div.removeChild(bcard);
    fcard.classList.remove('ghost');
    overlay.classList.remove('active');

}

export { openCard, closeCard };