const NOISE_SEED = 100;

let sunTexture, earthTexture, moonTexure;
let starPositions = [];
let ui;
let starCount = 100;

let UI_starCount;
let UI_earthSunDistance;
let UI_earthRotationSpeed;
let UI_moonSunDistance

function setup() {
  createCanvas(700, 700, WEBGL);
  setupUI();

  // Set seeds
  noiseSeed(NOISE_SEED);
}

function draw() {
  background('black');

  let earth = new SpaceObject(10, UI_earthRotationSpeed.value(), 15, earthTexture, UI_earthSunDistance.value(), true, moonTexure);
  let sun = new SpaceObject(30, .05, 15, sunTexture, 0, false);
  
  // Create the starfield
  SpaceObject.createStarfield(starCount, starPositions)

  // Create the sun
  sun.createSpaceObject();

  // Create the earth
  earth.createSpaceObject();

}

function setupUI() {
  ui = new UI();

  let xOffset = width + 10; // Starting x position
  let yOffset = 0;  // Starting y position
  let ySpacing = 20;
  let gap = 40;  // Vertical space between rows

  // Number of Stars
  ui.createLabel('Number of Stars:', xOffset, yOffset)
  yOffset += ySpacing;
  UI_starCount = ui.createTextBox('100', xOffset, yOffset);
  ui.createButton('Update Stars', xOffset + 170, yOffset, updateStarCount);

  // Earth Distance From Sun
  yOffset += gap;
  ui.createLabel('Earth Distance From Sun:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_earthSunDistance = ui.createSlider(0, width, 50, 5, xOffset, yOffset);

  // Earth Rotation Speed
  yOffset += gap;
  ui.createLabel('Earth Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_earthRotationSpeed = ui.createSlider(0, 1, .05, .01, xOffset, yOffset);

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
  ui.createCheckbox('', false, xOffset + 170, yOffset)

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
  ui.createButton('Add Planet', xOffset, yOffset)
  ui.createButton('Remove Last Planet', xOffset + 120, yOffset)
  yOffset += ySpacing
  ui.createButton('Pause/Resume', xOffset, yOffset)
  ui.createButton('Reset', xOffset + 120, yOffset)
}

function updateStarCount() {
  starPositions = [];
  starCount = UI_starCount.value();
}

function preload() {
  sunTexture = loadImage('./assets/sun.jpg')
  earthTexture = loadImage('./assets/earth_daymap.jpg');
  moonTexure = loadImage('./assets/moon.jpg');
}

