let symbolSize = 14;
var fadeInterval = 1.6;
let streams = [];
let bgImage;

/**
 * ======================================================
 * p5.js functions
 * ======================================================
 */

/**
 * Function that gets called once on initial load
 */
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let x = 0;

  for (let i = 0; i <= width / symbolSize; i++) {
    stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textFont("Consolas");
  textSize(symbolSize);
}

/**
 * Function that gets called repeatedly
 * at 60 frames per second.
 */
function draw() {
  background(0, 0, 0, 80);
  streams.forEach((stream) => {
    stream.render();
  });
}
/**
 * ======================================================
 * p5.js functions
 * ======================================================
 */

class MatrixSymbol {
  constructor(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.first = first;
    this.opacity = opacity;
    this.switchInterval = round(random(2, 25));
  }
  setToRandomSymbol() {
    let charType = round(random(0, 5));
    if (frameCount % this.switchInterval === 0) {
      this.value =
        charType > 1
          ? String.fromCharCode(0x30a0 + floor(random(0, 97)))
          : floor(random(0, 10));
    }
  }
  rain() {
    this.y = this.y >= height ? 0 : (this.y += this.speed);
  }
}

class Stream {
  constructor() {
    this.matrixSymbols = [];
    this.totalMatrixSymbols = round(random(5, 30));
    this.speed = random(5, 15);
  }

  generateSymbols(x, y) {
    let opacity = 255;
    let first = round(random(0, 3)) === 1;
    for (let i = 0; i <= this.totalMatrixSymbols; i++) {
      let symbol = new MatrixSymbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.matrixSymbols.push(symbol);
      opacity -= 255 / this.totalSymbols / fadeInterval;
      y -= this.totalMatrixSymbols;
      first = false;
    }
  }

  render() {
    this.matrixSymbols.forEach((symbol) => {
      if (symbol.first) {
        noStroke();
        textSize(22);
        textStyle(BOLD);
        fill(180, 255, 180, symbol.opacity);
      } else {
        textSize(14);
        fill(0, 200, 70, symbol.opacity * 200);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}
