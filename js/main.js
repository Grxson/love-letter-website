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

const SEEN_KEY = "love-letter-seen";

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

  const alreadySeen = localStorage.getItem(SEEN_KEY) === "1";

  if (alreadySeen) {
    // Ya lo vio: render instantáneo del estado final (árbol crecido, corrido a la derecha, suelo completo).
    while (tree.canGrow()) tree.grow();
    while (tree.canFlower()) tree.flower(16);
    tree.resetFallingBlooms();
    footer.length = footer.width;
    footer.draw();
    staticCanvas.classList.add("shifted");
  } else {
    seed.draw();
    await waitForUserClick(seed, dynamicCanvas);
    await animateSeedShrink(seed);
    await animateSeedMove(seed, footer);
    await animateTreeGrow(tree);
    await animateFlowerBloom(tree);
    tree.resetFallingBlooms();

    footer.draw();
    await animateTreeMove(staticCanvas);
    localStorage.setItem(SEEN_KEY, "1");
  }

  showLoveLetter();
  startHeartJumpAnimation(tree);
  startQuotes(CONFIG);
}

document.addEventListener("DOMContentLoaded", startApp);
