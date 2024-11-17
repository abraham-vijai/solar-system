const NOISE_SEED = 100;
const RANDOM_SEED = 100;
const STAR_COUNT = 100;

let sunTexture, earthTexture, moonTexure;
let starPositions = []; 
let ui;

function setup() {
  createCanvas(700, 700, WEBGL);
  setupUI();

  // Set seeds
  noiseSeed(NOISE_SEED);
  randomSeed(RANDOM_SEED);
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
  if (starPositions.length == 0) {
    for (let i = 0; i < numStars; i++) {
      starPositions.push({
        x: random(-width/2, width/2),
        y: random(-height/2, height/2),
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

function setupUI(params) {
  ui = new UI();

  let xOffset = width+10; // Starting x position
  let yOffset = 0;  // Starting y position
  let ySpacing = 20;
  let gap = 40;  // Vertical space between rows

  ui.createLabel('Number of Stars:', xOffset, yOffset)
  yOffset += ySpacing;
  ui.createTextBox('', xOffset, yOffset);
  ui.createButton('Update Stars', xOffset+170,yOffset)

  yOffset += gap;
  ui.createLabel('Earth Distance From Sun:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Earth Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Moon Distance From Sun:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Moon Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Planet Size:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Planet Color:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createColorPicker('yellow', xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Planet Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);
  
  yOffset += gap;
  ui.createLabel('Custom Planet Distance From Sun:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Moon Distance From Sun:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Has Moon:', xOffset, yOffset);
  ui.createCheckbox('', false, xOffset+170, yOffset)

  yOffset += gap;
  ui.createLabel('Custom Moon Distance From Sun:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Moon Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Moon Size:', xOffset, yOffset);
  yOffset += ySpacing;
  ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createButton('Add Planet',xOffset,yOffset)
  ui.createButton('Remove Last Planet',xOffset+120,yOffset)
  yOffset += ySpacing
  ui.createButton('Pause/Resume',xOffset,yOffset)
  ui.createButton('Reset',xOffset+120,yOffset)
}

function preload() {
  sunTexture = loadImage('./assets/sun.jpg')
  earthTexture = loadImage('./assets/earth_daymap.jpg');
  moonTexure = loadImage('./assets/moon.jpg');
}

