// ===========================
// Show Letter
// ===========================

function showLoveLetter() {
  const letter = document.getElementById("letter");
  typewriter(letter);
}

// ===========================
// Main Initialization
// ===========================

async function startApp() {
  initContent(CONFIG);

  const staticCanvas = initCanvas("static-canvas");
  const groundCanvas = initCanvas("ground-canvas");
  const dynamicCanvas = initCanvas("canvas");

  const tree = new Tree(
    staticCanvas,
    dynamicCanvas,
    groundCanvas,
    StageConfig.width,
    StageConfig.height,
    TreeShape,
    CONFIG
  );
  const { seed, footer } = tree;

  scaleContent();

  // Animación completa en cada carga: corazón semilla visible primero,
  // luego árbol, flores, desplazamiento y carta.
  seed.draw();
  await wait(450);
  await animateSeedShrink(seed);
  await animateSeedMove(seed, footer);
  await animateTreeGrow(tree);
  await animateFlowerBloom(tree);
  tree.resetFallingBlooms();

  footer.draw();
  await animateTreeMove(staticCanvas);

  showLoveLetter();
  startHeartJumpAnimation(tree);
  startQuotes(CONFIG);

  // Música: primer toque en cualquier parte (los navegadores bloquean el autoplay).
  const audio = document.getElementById("bgm");
  const startMusic = () => {
    audio.play().catch(() => {});
    window.removeEventListener("pointerdown", startMusic);
  };
  window.addEventListener("pointerdown", startMusic, { once: true });
}

document.addEventListener("DOMContentLoaded", startApp);
