const NOISE_SEED = 100;
const RANDOM_SEED = 100;
const STAR_COUNT = 100;

let sunTexture, earthTexture, moonTexure;
let starPositions = []; // Array to store star positions

function setup() {
  createCanvas(700, 700, WEBGL);
}

function draw() {
  background('black');

  // Create the starfield
  createStarfield(STAR_COUNT)

  // Create the sun
  // Disable wireframe
  noStroke();

  // Load the texture
  texture(sunTexture);

  // Rotate around sun
  push();
  rotate(frameCount * .02);
  sphere(30, 20, 20);
  pop();

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

  // Rotate around sun
  rotate(frameCount * .002);

  // Translate to its position
  translate(distanceFromOrigin, 0)

  // Rotate around its own axis
  rotateZ(frameCount *.01)

  // Draw the sphere
  sphere(radius, 20, 20);

  if(hasMoon) {
    // Disable wireframe
    noStroke();

    // Load the texture
    texture(moonTexure);
    
    push();

    // Rotate the object around its planet
    rotate(frameCount *.02);

    // Move the object
    translate(30, 0);
    
    // Draw sphere
    sphere(8, 20, 20);

    pop();
  }
  pop();
}

function preload() {
  sunTexture = loadImage('./assets/sun.jpg')
  earthTexture = loadImage('./assets/earth_daymap.jpg');
  moonTexure = loadImage('./assets/moon.jpg');
}

