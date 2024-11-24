/*
Filename    : sketch.js
Author      : Abraham Vijai
Date        : 2024-11-23
Description : This is the sketch.js function
*/

const SUN_RADIUS = 30;
const SUN_COLOR = 'yellow';
const STAR_WIDTH = 3;
const SUBDIVISION = 15;

let earthTexture, moonTexure;

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
}

/*
Method name  : draw
Description  : Main drawing loop that renders the starfield, sun, earth, moon, and planets.
Parameters   : None
Return value : None
*/
function draw() {
  background('black');

  let earth = new Planet(10, UI.UI_earthRotationSpeed.value(), SUBDIVISION, earthTexture, UI.UI_earthSunDistance.value(), true, null);
  let sun = new Planet(SUN_RADIUS, .05, SUBDIVISION, null, 0, false, SUN_COLOR);
  let moon = new Moon(5, UI.UI_moonEarthDistance.value(), UI.UI_moonRotationSpeed.value(), moonTexure);

  // Create the starfield
  Planet.createStarfield();

  // Create the sun
  push();
  sun.createPlanet();
  pop();

  // Create the earth and moon
  push();
  earth.createPlanet();
  moon.createMoon();
  // earth.setMoonValues(5, UI.UI_moonRotationSpeed.value(), UI.UI_moonEarthDistance.value(), moonTexure);
  // earth.createMoon();
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
  earthTexture = loadImage('./assets/earth_daymap.jpg');
  moonTexure = loadImage('./assets/moon.jpg');
}