const NOISE_SEED = 100;
const RANDOM_SEED = 100;

function setup() {
  createCanvas(700, 700, WEBGL);
}

function draw() {
  background('black');

  // Create the starfield
  createStarfield(1000)


  
}

function createStarfield(numStars) {
  noLoop();
  
  for (let i = 0; i < numStars; i++) {
    // Create starfield
    strokeWeight(3);
    stroke('white')
    point(random(-width,width),random(-height,height))
  }
}