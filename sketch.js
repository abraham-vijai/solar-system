const NOISE_SEED = 100;
const RANDOM_SEED = 100;
const STAR_COUNT = 100;

let sunTexture;
let starPositions = [];

function setup() {
  createCanvas(700, 700, WEBGL);
}

function draw() {
  background('black');

  // Create the starfield
  createStarfield(STAR_COUNT)

  // Create the sun
  createCelestialBody(100,sunTexture,0);

}

function createStarfield(numStars) {

  // Generate star positions once
  if (starPositions.length === 0) {
    for (let i = 0; i < numStars; i++) {
      starPositions.push({
        x: random(-width, width),
        y: random(-height, height),
      });
    }
  }

  // Draw the stars
  strokeWeight(3);
  stroke('white');
  for (let star of starPositions) {
    point(star.x, star.y);
  }
}


function createCelestialBody(radius, txtr, distanceFromOrigin) {
  // Disable wireframe
  noStroke();

  // Load the texture
  texture(txtr);

  push();

  // Rotate around its own axis and around the distance
  rotate(frameCount * .02);

  // Translate to its position
  translate(distanceFromOrigin, 0)
  
  // Draw the sphere
  sphere(radius, 20, 20);

  pop();
}
function preload(){
  sunTexture = loadImage('./assets/sun.jpg')
}

