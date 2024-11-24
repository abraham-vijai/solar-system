class Moon {
    constructor(moonSize, moonPlanetDistance, moonRotationSpeed, textureMoon) {
        this.radius = moonSize;
        this.distance = moonPlanetDistance;
        this.rotationSpeed = moonRotationSpeed;
        this.texture = textureMoon;
    }

    /*
    Method name  : createMoon
    Description  : Renders the moon if the parent object has a moon, applying texture or default appearance.
    Parameters   : None
    Return value : None
    */
    createMoon() {
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
    }
}