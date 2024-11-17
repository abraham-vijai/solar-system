const NOISE_SEED = 100;
const RANDOM_SEED = 100;
const STAR_COUNT = 100;

let sunTexture, earthTexture, moonTexure;
let starPositions = []; 

function setup() {
  createCanvas(700, 700, WEBGL);
}

function draw() {
  background('black');
  
  let earth = new CelestialObject(10, 15, earthTexture, 200, true, moonTexure);
  let sun = new CelestialObject(30, 15, sunTexture, 0, false);

  // Create the starfield
  createStarfield(STAR_COUNT)

  // Create the sun
  sun.createCelestialObject();

  // Create the earth
  earth.createCelestialObject();
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

function preload() {
  sunTexture = loadImage('./assets/sun.jpg')
  earthTexture = loadImage('./assets/earth_daymap.jpg');
  moonTexure = loadImage('./assets/moon.jpg');
}

