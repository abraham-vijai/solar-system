class CelestialObject {
    constructor(objectRadius, objectSubdivision, objectTexture, objectDistance, objectHasMoons = false, moonTexture = null) {
        this.radius = objectRadius;
        this.subdivision = objectSubdivision;
        this.texture = objectTexture;
        this.distance = objectDistance;
        this.hasMoons = objectHasMoons;
        this.moonTexture = moonTexture; 
    }

    createCelestialObject() {
        // Disable wireframe
        noStroke();

        // Load the texture for the celestial object
        texture(this.texture);

        push();

        // Rotate around the sun
        rotate(frameCount * 0.002);

        // Translate to its position
        translate(this.distance, 0);

        // Rotate around its own axis
        rotateZ(frameCount * 0.01);

        // Draw the sphere
        sphere(this.radius, this.subdivision, this.subdivision);

        // If the object has a moon, render it
        if (this.hasMoons && this.moonTexture) {
            this.createMoon();
        }

        pop();
    }

    createMoon() {
        // Disable wireframe
        noStroke();

        // Load the texture for the moon
        texture(this.moonTexture);

        push();

        // Rotate the moon around its parent planet
        rotate(frameCount * 0.02);

        // Translate to moon's position relative to the planet
        translate(this.radius + 30, 0);

        // Draw the moon sphere
        sphere(8, 20, 20);

        pop();
    }
}
