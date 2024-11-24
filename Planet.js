/*
Filename    : Planet.js
Author      : Abraham Vijai
Date        : 2024-11-24
Description : This is the Planet.js function. Which handles logic for Planet object
*/

/*
Class name   : Planet
Description  : Represents a planetary object in the simulation. Handles properties such as size, rotation, texture, distance from the sun, and optional moon attributes.
*/
class Planet {
    constructor(planetRadius, planetRotationSpeed, planetSubdivision, planetTexture, planetDistance, planetHasMoon = false, planetColor = null) {
        this.radius = planetRadius;
        this.subdivision = planetSubdivision;
        this.texture = planetTexture;
        this.distance = planetDistance;
        this.rotationSpeed = planetRotationSpeed;
        this.hasMoon = planetHasMoon;
        this.color = planetColor;
    }

    static starCount = 100;
    static starArray = [];
    static planetsArray = [];

    /*
    Method name  : createPlanet
    Description  : Renders the planet in the simulation, applying texture or color and managing rotation and positioning.
    Parameters   : None
    Return value : None
    */
    createPlanet() {
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
    Method name  : loadSurface
    Description  : Applies texture or color to the space object. Handles lighting and material properties.
    Parameters   : customTexture: Texture of the object.
                   customColor: Color of the object (hex code).
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
    Method name  : convertToRgb
    Description  : Converts a hex color to an RGB array.
    Parameters   : colorToConvert: Hex color value.
    Return value : Array [number, number, number] representing RGB values.
    */
    convertToRgb(colorToConvert) {
        let hexColor = colorToConvert; // Get the color from the color picker
        let c = color(hexColor); // Convert hex to a p5.js color object

        return [red(c), green(c), blue(c)];
    }

    /*
    Method name  : setStarCount
    Description  : Updates the number of stars in the starfield.
    Parameters   :  newStarCount: The new number of stars to display.
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
}