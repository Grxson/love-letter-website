// ===========================
// Romantic Quotes (rotating)
// ===========================

function startQuotes(config) {
  const box = document.getElementById("quote-box");
  const text = document.getElementById("quote-text");
  const quotes = config.quotes || [];
  let index = 0;

  function show() {
    text.textContent = quotes[index % quotes.length];
    index++;
  }

  box.classList.add("quote-box--visible");
  show();

  setInterval(() => {
    box.classList.remove("quote-box--visible");
    setTimeout(() => {
      show();
      box.classList.add("quote-box--visible");
    }, 500);
  }, config.quoteInterval || 4500);
}

// ===========================
// Responsive Scaling
// ===========================

function scaleContent() {
  const viewport = document.getElementById("viewport");
  const main = document.getElementById("main");
  const content = document.getElementById("content");
  const isMobileLayout = () => window.innerWidth <= 600;

  function resize() {
    const scale = Math.min(
      window.innerWidth / StageConfig.width,
      window.innerHeight / StageConfig.height,
      1
    );
    viewport.style.width = `${StageConfig.width * scale}px`;
    viewport.style.height = `${StageConfig.height * scale}px`;
    document.documentElement.style.setProperty("--hero-h", `${StageConfig.height * scale}px`);
    main.style.transform = `scale(${scale})`;
    if (isMobileLayout()) {
      content.style.transform = "";
    } else {
      content.style.transform = `scale(${scale})`;
    }
  }

  resize();
  window.addEventListener("resize", resize);
}

// ===========================
// Content Initialization
// ===========================

function initContent(config) {
  const letter = document.getElementById("letter");
  letter.textContent = "";

  function addParagraph(lines) {
    lines.forEach(line => {
      const p = document.createElement("p");
      p.textContent = line;
      letter.appendChild(p);
    });
  }

  const paragraphs = Object.values(config.letter);
  paragraphs.forEach((lines, index) => {
    if (index > 0) letter.appendChild(document.createElement("br"));
    addParagraph(lines);
  });
}

// ===========================
// Canvas Initialization
// ===========================

function initCanvas(id) {
  const canvas = document.getElementById(id);
  const { width: w, height: h } = StageConfig;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  canvas.getContext("2d").scale(dpr, dpr);
  return canvas;
}
