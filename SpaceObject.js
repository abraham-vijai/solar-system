/*
Filename    : SpaceObject.js
Author      : Abraham Vijai
Date        : 2024-11-23
Description : This is the SpaceObject.js class which represents the planets moons etc.
*/

/*
Name        : SpaceObject
Description : Represents celestial objects in the simulation (e.g., planets, moons). 
              Provides methods for rendering, adding moons, and creating a starfield.
*/
class SpaceObject {

  /*
  Method name  : constructor
  Description  : Initializes a SpaceObject with specified properties such as size, texture, 
                 distance, rotation speed, and whether it has a moon.
  Parameters   : 
                 - objectRadius (number): Radius of the object.
                 - objectRotationSpeed (number): Rotation speed of the object.
                 - objectSubdivision (number): Level of detail for rendering the object.
                 - objectTexture (p5.Image or null): Texture to be applied to the object.
                 - objectDistance (number): Distance of the object from its parent (e.g., sun).
                 - objectHasMoon (boolean): Indicates if the object has a moon.
                 - objectColor (string or null): Color of the object (hex code).
  Return value : None
  */
  constructor(objectRadius, objectRotationSpeed, objectSubdivision, objectTexture, objectDistance, objectHasMoon = false, objectColor = null) {
    this.radius = objectRadius;
    this.subdivision = objectSubdivision;
    this.texture = objectTexture;
    this.distance = objectDistance;
    this.rotationSpeed = objectRotationSpeed;
    this.hasMoon = objectHasMoon;
    this.color = objectColor;
  }

  static starCount = 100;
  static starArray = [];
  static planetArray = [];
  static moonSize = 0;
  static moonPlanetDistance = 0;
  static moonRotationSpeed = 0;
  static customTexture = null;

  /*
  Method name  : createSpaceObject
  Description  : Renders the space object, applying texture or color, and handles rotation and positioning.
  Parameters   : None
  Return value : None
  */
  createSpaceObject() {
    // Disable wireframe
    noStroke();

    // Add texture or color
    this.loadSurface(this.texture, this.color);

    // Rotate around the sun
    rotate(frameCount * this.rotationSpeed);

    // Translate to its position
    translate(this.distance, 0);

    // Rotate around its own axis
    rotateZ(frameCount * 0.01);

    // Draw the sphere
    sphere(this.radius, this.subdivision, this.subdivision);
  }

  /*
  Method name  : setMoonValues
  Description  : Sets the moon's size, rotation speed, distance from the planet, and texture.
  Parameters   : 
                 - size (number): Radius of the moon.
                 - speed (number): Rotation speed of the moon.
                 - distance (number): Distance of the moon from its parent planet.
                 - txtr (p5.Image or null): Texture of the moon.
  Return value : None
  */
  setMoonValues(size, speed, distance, txtr) {
    this.moonSize = size;
    this.moonRotationSpeed = speed;
    this.moonPlanetDistance = distance;
    this.customTexture = txtr;
  }

  /*
  Method name  : createMoon
  Description  : Renders the moon if the parent object has a moon, applying texture or default appearance.
  Parameters   : None
  Return value : None
  */
  createMoon() {
    if (this.hasMoon) {
      // Disable wireframe
      noStroke();

      // Add texture or default appearance
      if (this.customTexture == null) {
        normalMaterial();
      } else {
        texture(this.customTexture);
      }

      push();

      // Rotate the moon around its parent planet
      rotate(frameCount * this.moonRotationSpeed);

      // Translate to moon's position relative to the planet
      translate(this.radius + this.moonPlanetDistance + 5, 0);

      // Draw the moon sphere
      sphere(this.moonSize, 20, 20);

      pop();
    }
  }

  /*
  Method name  : loadSurface
  Description  : Applies texture or color to the space object. Handles lighting and material properties.
  Parameters   : 
                 - customTexture (p5.Image or null): Texture of the object.
                 - customColor (string or null): Color of the object (hex code).
  Return value : None
  */
  loadSurface(customTexture, customColor) {
    if (customTexture == null) {
      // Convert the color to RGB
      let clr = this.convertToRgb(customColor);

      // Use ambient and directional light
      ambientLight(150);

      // Set directional light
      colorMode(HSB);
      directionalLight(255, 0, 50, 0, -5, -5);
      colorMode(RGB);

      // Set the color
      ambientMaterial(clr[0], clr[1], clr[2]);
    } else {
      // Apply the texture
      texture(customTexture);
    }
  }

  /*
  Method name  : setStarCount
  Description  : Updates the number of stars in the starfield.
  Parameters   : 
                 - newStarCount (number): The new number of stars to display.
  Return value : None
  */
  static setStarCount(newStarCount) {
    this.starCount = newStarCount;
  }

  /*
  Method name  : createStarfield
  Description  : Generates a starfield with randomly positioned stars.
  Parameters   : None
  Return value : None
  */
  static createStarfield() {
    // Set seed
    randomSeed(100);

    // Generate star positions once
    if (this.starArray.length == 0) {
      for (let i = 0; i < this.starCount; i++) {
        this.starArray.push({
          x: random(-width / 2, width / 2),
          y: random(-height / 2, height / 2),
        });
      }
    }

    for (let star of this.starArray) {
      // Draw the stars
      strokeWeight(STAR_WIDTH);
      stroke(random(180, 255), random(180, 255), random(180, 255));
      point(star.x, star.y);
    }
  }

  /*
  Method name  : convertToRgb
  Description  : Converts a hex color to an RGB array.
  Parameters   : 
                 - colorToConvert (string): Hex color value.
  Return value : Array [number, number, number] representing RGB values.
  */
  convertToRgb(colorToConvert) {
    let hexColor = colorToConvert; // Get the color from the color picker
    let c = color(hexColor); // Convert hex to a p5.js color object

    return [red(c), green(c), blue(c)];
  }
}
