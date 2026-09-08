const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");

const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
assert.match(
  styles,
  /#content\s*\{[\s\S]*?pointer-events\s*:\s*none\s*;/,
  "content overlay must let clicks reach canvas"
);

class TestPath2D {
  moveTo() {}
  quadraticCurveTo() {}
  closePath() {}
}

function createContext() {
  return {
    save() {}, restore() {}, translate() {}, scale() {}, rotate() {},
    beginPath() {}, arc() {}, closePath() {}, fill() {}, clearRect() {},
    moveTo() {}, lineTo() {}, stroke() {}, fillText() {},
    getImageData() { return { data: [0, 0, 0, 0] }; }
  };
}

const context = vm.createContext({
  console,
  Path2D: TestPath2D,
  document: { documentElement: {} },
  getComputedStyle() { return { getPropertyValue() { return "260"; } }; }
});
vm.runInContext(
  fs.readFileSync(path.join(root, "js", "geometry.js"), "utf8"),
  context
);
vm.runInContext(
  fs.readFileSync(path.join(root, "js", "tree.js"), "utf8"),
  context
);

context.Point = vm.runInContext('Point', context);
context.Seed = vm.runInContext('Seed', context);
const tree = { ctx: createContext(), width: 1100, height: 680 };
const seed = new context.Seed(tree, new context.Point(530, 340), 3, "#f00");

while (seed.canScale()) seed.scale(0.95);
assert.ok(seed.heart.scale >= 1, "seed heart must remain large after shrink animation");

seed.move(0, 50);
assert.equal(seed.heart.point.y, 390, "heart must follow seed movement");
assert.equal(seed.hover(530, 390), true, "seed hit area must remain clickable around heart");
