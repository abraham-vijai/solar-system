const NOISE_SEED = 100;
const RANDOM_SEED = 100;
const STAR_COUNT = 100;

let sunTexture, earthTexture, moonTexure;
let starPositions = []; // Array to store star positions

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background('black');

  // Create the starfield
  createStarfield(STAR_COUNT)

  // Create the sun
  createCelestialBody(30, sunTexture, 0, false);

  // Create the earth
  createCelestialBody(10, earthTexture, 200, true);
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

function createCelestialBody(radius, txtr, distanceFromOrigin, hasMoon) {
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

  if(hasMoon) {
    // Disable wireframe
    noStroke();

    // Load the texture
    texture(moonTexure);

    // Rotate the object around its planet
    rotate(frameCount *.1);
    
    push();

    // Move the object
    translate(30, 0);
    
    // Draw sphere
    sphere(5, 20, 20);

    pop();
  }

  pop();
}

function preload() {
  sunTexture = loadImage('./assets/sun.jpg')
  earthTexture = loadImage('./assets/earth_daymap.jpg');
  moonTexure = loadImage('./assets/moon.jpg');
}

