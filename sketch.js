const NOISE_SEED = 100;

let sunTexture, earthTexture, moonTexure;
let starPositions = [];
let planetArray = [];
let ui;
let starCount = 100;

let UI_starCount;
let UI_earthSunDistance;
let UI_earthRotationSpeed;
let UI_moonSunDistance;
let UI_moonRotationSpeed;
let UI_planetRotationSpeed;
let UI_planetSize;
let UI_planetSunDistance;
let UI_planetColor;
let UI_planetHasMoon;
let UI_planetMoonRotationSpeed;
let UI_planetMoonSize;
let UI_planetMoonDistance;

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
  push();
  sun.createSpaceObject();
  pop();
  
  // Create the earth and moon
  push();
  earth.createSpaceObject();
  earth.addMoon(40,UI_moonSunDistance.value(), UI_moonRotationSpeed.value(), moonTexure);
  pop();

  // Display the planets in the array
  for(let planet of planetArray){
    push();
    planet.createSpaceObject();
    pop();
  }
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
  UI_earthSunDistance = ui.createSlider(0, width, 200, 5, xOffset, yOffset);

  // Earth Rotation Speed
  yOffset += gap;
  ui.createLabel('Earth Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_earthRotationSpeed = ui.createSlider(0, 1, .02, .001, xOffset, yOffset);

  // Moon Distance From Sun
  yOffset += gap;
  ui.createLabel('Moon Distance From Sun:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_moonSunDistance = ui.createSlider(0, width, 10, 5, xOffset, yOffset);

  // Moon Rotation Speed
  yOffset += gap;
  ui.createLabel('Moon Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_moonRotationSpeed = ui.createSlider(0, 1, .02, .01, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Planet Size:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetSize = ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Planet Color:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetColor = ui.createColorPicker('yellow', xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Planet Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetRotationSpeed = ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Planet Distance From Sun:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetSunDistance = ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Has Moon:', xOffset, yOffset);
  UI_planetHasMoon = ui.createCheckbox('', false, xOffset + 170, yOffset)

  yOffset += gap;
  ui.createLabel('Custom Moon Distance From Planet:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetMoonDistance = ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Moon Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetMoonRotationSpeed = ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Custom Moon Size:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetMoonSize = ui.createSlider(0, 500, 50, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createButton('Add Planet', xOffset, yOffset, addPlanet);
  ui.createButton('Remove Last Planet', xOffset + 120, yOffset, removeLastPlanet)
  yOffset += ySpacing
  ui.createButton('Pause/Resume', xOffset, yOffset)
  ui.createButton('Reset', xOffset + 120, yOffset)
}

function addPlanet() {
  let newPlanet;

  planetArray.push(newPlanet = new SpaceObject(
    UI_planetSize.value(),
    UI_planetRotationSpeed.value(),
    15,
    moonTexure,
    UI_planetSunDistance.value()
  )); // Store the new planet in the array
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

