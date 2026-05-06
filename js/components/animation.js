const overlay = document.getElementById("overlay");

let _flipWrap = null;
let _frontCard = null;
let _backCard = null;
let _ghost = null;

function openCard(div, frontCard, backCard) {

    const cardRect = frontCard.getBoundingClientRect();

        _ghost = document.createElement("div");
        _ghost.className = "ghost";
        _ghost.style.cssText = `
            width: ${frontCard.offsetWidth}px;
            height: ${frontCard.offsetHeight}px;`;

        frontCard.replaceWith(_ghost);

  const flipWrap = document.createElement("div");
  flipWrap.style.cssText = `
    position: fixed;
    top: ${cardRect.top}px;
    left: ${cardRect.left}px;
    width: ${cardRect.width}px;
    height: ${cardRect.height}px;
    transform-style: preserve-3d;
    transform: rotateY(0deg);
    transition: none;
    z-index: 20;`;

  frontCard.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;`;

  backCard.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: rotateY(180deg);`;

  flipWrap.appendChild(frontCard);
  flipWrap.appendChild(backCard);
  overlay.appendChild(flipWrap);

  _flipWrap = flipWrap;
  _frontCard = frontCard;
  _backCard = backCard;

  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const popW = Math.min(350, window.innerWidth * 0.55);
      const popH = popW * (4 / 3);
      const targetTop = (window.innerHeight - popH) / 2;
      const targetLeft = (window.innerWidth - popW) / 2;

      flipWrap.style.cssText = `
      position: fixed;
      top: ${targetTop}px;
      left: ${targetLeft}px;
      width: ${popW}px;
      height: ${popH}px;
      transform-style: preserve-3d;
      transform: rotateY(180deg);
      transition:
        top 0.65s cubic-bezier(0.4,0,0.2,1),
        left 0.65s cubic-bezier(0.4,0,0.2,1),
        width 0.65s cubic-bezier(0.4,0,0.2,1),
        height 0.65s cubic-bezier(0.4,0,0.2,1),
        transform 0.65s cubic-bezier(0.4,0,0.2,1);
      z-index: 20;`;

      overlay.classList.add("active");
    }),
  );
}

function closeCard() {
  if (!_flipWrap) return;

  const flipWrap = _flipWrap;
  const frontCard = _frontCard;
  const ghost = _ghost;

  const ghostRect = ghost.getBoundingClientRect();

  flipWrap.style.cssText = `
    position: fixed;
    top: ${ghostRect.top}px;
    left: ${ghostRect.left}px;
    width: ${ghostRect.width}px;
    height: ${ghostRect.height}px;
    transform-style: preserve-3d;
    transform: rotateY(0deg);
    transition:
      top 0.55s cubic-bezier(0.4,0,0.2,1),
      left 0.55s cubic-bezier(0.4,0,0.2,1),
      width 0.55s cubic-bezier(0.4,0,0.2,1),
      height 0.55s cubic-bezier(0.4,0,0.2,1),
      transform 0.55s cubic-bezier(0.4,0,0.2,1);
    z-index: 20;`;

  overlay.classList.remove("active");
  _flipWrap = null;
  _frontCard = null;
  _backCard = null;
    _ghost = null;

  flipWrap.addEventListener(
    "transitionend",
    function done() {
      flipWrap.removeEventListener("transitionend", done);
      
      frontCard.style.cssText = "";
      ghost.replaceWith(frontCard);
      flipWrap.remove();
    },
    { once: true },
  );
}

export { openCard, closeCard };
