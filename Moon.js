class Moon {
    constructor(moonSize, moonPlanetDistance, moonRotationSpeed, textureMoon) {
        this.radius=  moonSize;
        this.distance = moonPlanetDistance;
        this.rotationSpeed = moonRotationSpeed;
        this.texture = textureMoon;
    }
    // static moonSize = 0;
    // static moonPlanetDistance = 0;
    // static moonRotationSpeed = 0;
    // static customTexture = null;
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
    // setMoonValues(size, speed, distance, txtr) {
    //     this.radius = size;
    //     this.distance = speed;
    //     this.rotationSpeed = distance;
    //     this.texture = txtr;
    // }

    /*
    Method name  : createMoon
    Description  : Renders the moon if the parent object has a moon, applying texture or default appearance.
    Parameters   : None
    Return value : None
    */
    createMoon() {
        // if (this.hasMoon) {
            // Disable wireframe
            noStroke();

            // Add texture or default appearance
            if (this.texture == null) {
                normalMaterial();
            } else {
                texture(this.texture);
            }

            push();

            // Rotate the moon around its parent planet
            rotate(frameCount * this.rotationSpeed);

            // Translate to moon's position relative to the planet
            translate(this.radius + this.distance + 5, 0);

            // Draw the moon sphere
            sphere(this.radius, 20, 20);

            pop();
        // }
    }
}