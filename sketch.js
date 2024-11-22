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
  earth.createMoon(5, UI_moonEarthDistance.value(), UI_moonRotationSpeed.value(), moonTexure);
  pop();

  // Display the planets in the array
  for(let planet of planetArray){
    push();
    planet.createSpaceObject();
    
    // Convert to RGB
    let hexColor = UI_planetColor.value(); // Get the color from the color picker
    let c = color(hexColor); // Convert hex to a p5.js color object
    let rgbColor = [red(c), green(c), blue(c)]; // Extract RGB values as an array
    
    // Add moon if the checkbox is checked       
    if (UI_planetHasMoon.checked()) {
      planet.createMoon(
        UI_planetMoonSize.value(),
        UI_planetMoonDistance.value(),
        UI_planetMoonRotationSpeed.value(),
        null
      );
    }
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

  // Moon Distance From Earth
  yOffset += gap;
  ui.createLabel('Moon Distance From Earth:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_moonEarthDistance = ui.createSlider(0, width, 10, 5, xOffset, yOffset);

  // Moon Rotation Speed
  yOffset += gap;
  ui.createLabel('Moon Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_moonRotationSpeed = ui.createSlider(0, 1, .02, .01, xOffset, yOffset);

  // Custom Planet Size:
  yOffset += gap;
  ui.createLabel('Custom Planet Size:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetSize = ui.createSlider(0, 100, 20, 1, xOffset, yOffset);

  // Custom Planet Color
  yOffset += gap;
  ui.createLabel('Custom Planet Color:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetColor = ui.createColorPicker('yellow', xOffset, yOffset);

  // Custom Planet Rotation Speed
  yOffset += gap;
  ui.createLabel('Custom Planet Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetRotationSpeed = ui.createSlider(0, 1, .02, .001, xOffset, yOffset);

  // Custom Planet Distance From Sun
  yOffset += gap;
  ui.createLabel('Custom Planet Distance From Sun:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetSunDistance = ui.createSlider(0, width, 300, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createLabel('Has Moon:', xOffset, yOffset);
  UI_planetHasMoon = ui.createCheckbox('', false, xOffset + 170, yOffset)

  // Custom Moon Distance From Planet
  yOffset += gap;
  ui.createLabel('Custom Moon Distance From Planet:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetMoonDistance = ui.createSlider(0, 50, 30, 1, xOffset, yOffset);

  // Custom Moon Rotation Speed
  yOffset += gap;
  ui.createLabel('Custom Moon Rotation Speed:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetMoonRotationSpeed = ui.createSlider(0, 1, .02, .005, xOffset, yOffset);

  // Custom Moon Size
  yOffset += gap;
  ui.createLabel('Custom Moon Size:', xOffset, yOffset);
  yOffset += ySpacing;
  UI_planetMoonSize = ui.createSlider(0, 100, 10, 5, xOffset, yOffset);

  yOffset += gap;
  ui.createButton('Add Planet', xOffset, yOffset, addPlanet);
  ui.createButton('Remove Last Planet', xOffset + 120, yOffset, removeLastPlanet)
  yOffset += ySpacing
  ui.createButton('Pause/Resume', xOffset, yOffset, pauseResume)
  ui.createButton('Reset', xOffset + 120, yOffset)
}

function pauseResume() {
  if(isPaused){
    loop();
    isPaused = false;
  }
  else{
    noLoop();
    isPaused = true;
  }
}

function addPlanet() {
  let newPlanet;

  // Convert to RGB
  let hexColor = UI_planetColor.value(); // Get the color from the color picker
  let c = color(hexColor); // Convert hex to a p5.js color object
  let rgbColor = [red(c), green(c), blue(c)]; // Extract RGB values as an array

  // Store the new planet in the array
  planetArray.push(newPlanet = new SpaceObject(
    UI_planetSize.value(),
    UI_planetRotationSpeed.value(),
    15,
    null,
    UI_planetSunDistance.value(),
    rgbColor
  )); 

  // // Add moon if the checkbox is checked
  // if (UI_planetHasMoon.checked()) {
  //   newPlanet.createMoon(
  //     UI_planetMoonSize.value(),
  //     UI_planetMoonDistance.value(),
  //     UI_planetMoonRotationSpeed.value(),
  //     rgbColor
  //   );
  // }

}

function removeLastPlanet() {
  if (planetArray.length > 0) {
    planetArray.pop(); // Remove the last planet in the array
  }
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

