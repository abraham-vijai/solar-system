const NOISE_SEED = 100;
const RANDOM_SEED = 100;
let sunTexture;

function setup() {
  createCanvas(700, 700, WEBGL);
}

function draw() {
  background('black');

  // Create the starfield
  createStarfield(1000)

  // Create the sun
  createCelestialBody(100,sunTexture,0);

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

function createCelestialBody(radius, txtr, distanceFromOrigin){
  // Disable wireframe
  noStroke();
  
  // Load the texture
  texture(txtr);

  // Move the object
  push();
  translate(distanceFromOrigin, 0, 0)
  sphere(radius, 20,20);
  pop();
}

function preload(){
  sunTexture = loadImage('./assets/sun.jpg')
}

