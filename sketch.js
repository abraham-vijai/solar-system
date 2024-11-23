const NOISE_SEED = 100;

let sunTexture, earthTexture, moonTexure;

let s_moonSize, s_moonColor, s_moonSpeed, s_moonDistance;

function setup() {
  createCanvas(700, 700, WEBGL);

  // Setup the UI
  UI.setupUI();

  // Set seeds
  noiseSeed(NOISE_SEED);
}

function draw() {
  background('black');

  let earth = new SpaceObject(10, UI.UI_earthRotationSpeed.value(), 15, earthTexture, UI.UI_earthSunDistance.value(), true, null);
  let sun = new SpaceObject(30, .05, 15, sunTexture, 0, false, null);

  // Create the starfield
  SpaceObject.createStarfield()

  // Create the sun
  push();
  sun.createSpaceObject();
  pop();

  // Create the earth and moon
  push();
  earth.createSpaceObject();
  earth.setMoonValues(5, UI.UI_moonRotationSpeed.value(), UI.UI_moonEarthDistance.value(), moonTexure);
  earth.createMoon();
  pop();

  // Display the planets in the array
  for (let planet of SpaceObject.planetArray) {
    push();
    planet.createSpaceObject();
    planet.createMoon();
    pop();
  }
}

function preload() {
  sunTexture = loadImage('./assets/sun.jpg')
  earthTexture = loadImage('./assets/earth_daymap.jpg');
  moonTexure = loadImage('./assets/moon.jpg');
}

