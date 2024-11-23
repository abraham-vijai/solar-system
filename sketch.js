/*
Filename    : sketch.js
Author      : Abraham Vijai
Date        : 2024-11-23
Description : This is the sketch.js function
*/

const NOISE_SEED = 100;

let sunTexture, earthTexture, moonTexure;

/*
Method name  : setup
Description  : Sets up the canvas and initializes UI components and seed values.
Parameters   : None
Return value : None
*/
function setup() {
  createCanvas(700, 700, WEBGL);

  // Setup the UI
  UI.setupUI();

  // Set seeds
  noiseSeed(NOISE_SEED);
}

/*
Method name  : draw
Description  : Main drawing loop that renders the starfield, sun, earth, moon, and planets.
Parameters   : None
Return value : None
*/
function draw() {
  background('black');

  let earth = new SpaceObject(10, UI.UI_earthRotationSpeed.value(), 15, earthTexture, UI.UI_earthSunDistance.value(), true, null);
  let sun = new SpaceObject(30, .05, 15, sunTexture, 0, false, null);

  // Create the starfield
  SpaceObject.createStarfield();

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

/*
Method name  : preload
Description  : Preloads textures for the sun, earth, and moon.
Parameters   : None
Return value : None
*/
function preload() {
  sunTexture = loadImage('./assets/sun.jpg');
  earthTexture = loadImage('./assets/earth_daymap.jpg');
  moonTexure = loadImage('./assets/moon.jpg');
}