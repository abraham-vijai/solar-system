const NOISE_SEED = 100;

let sunTexture, earthTexture, moonTexure;
let starPositions = [];
let planetArray = [];
let ui;
let starCount = 100;
let isPaused = false;

let UI_starCount;
let UI_earthSunDistance;
let UI_earthRotationSpeed;
let UI_moonEarthDistance;
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
  UI.setupUI();

  // Set seeds
  noiseSeed(NOISE_SEED);
}

function draw() {
  background('black');

  let earth = new SpaceObject(10, UI_earthRotationSpeed.value(), 15, earthTexture, UI_earthSunDistance.value(), true, null);
  let sun = new SpaceObject(30, .05, 15, sunTexture, 0, false, null);
  
  // Create the starfield
  SpaceObject.createStarfield(starCount, starPositions)

  // Create the sun
  push();
  sun.createSpaceObject();
  pop();
  
  // Create the earth and moon
  push();
  earth.createSpaceObject();
  earth.createMoon(5, UI_moonEarthDistance.value(), UI_moonRotationSpeed.value(), moonTexure);
  pop();

  // Display the planets in the array
  for(let planet of planetArray){
    push();
    planet.createSpaceObject();
    planet.createMoon(UI_planetMoonSize.value(), UI_planetMoonDistance.value(),UI_planetMoonRotationSpeed.value(), moonTexure);
    pop();
  }
}

function preload() {
  sunTexture = loadImage('./assets/sun.jpg')
  earthTexture = loadImage('./assets/earth_daymap.jpg');
  moonTexure = loadImage('./assets/moon.jpg');
}

