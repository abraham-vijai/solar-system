class SpaceObject {
  constructor(objectRadius, objectRotationSpeed, objectSubdivision, objectTexture, objectDistance) {
    this.radius = objectRadius;
    this.subdivision = objectSubdivision;
    this.texture = objectTexture;
    this.distance = objectDistance;
    this.rotationSpeed = objectRotationSpeed;
  }

  createSpaceObject() {
    // Disable wireframe
    noStroke();

    // Load the texture for the celestial object
    texture(this.texture);

    // Rotate around the sun
    rotate(frameCount * this.rotationSpeed);

    // Translate to its position
    translate(this.distance, 0);

    // Rotate around its own axis
    rotateZ(frameCount * 0.01);

    // Draw the sphere
    sphere(this.radius, this.subdivision, this.subdivision);

  }
  
  addMoon(distanceFromPlanet, distanceFromSun, rotationSpeed, moonTexture) {
    // Disable wireframe
    noStroke();

    // Load the texture for the moon
    texture(moonTexture);

    push();
    // Rotate the moon around its parent planet
    rotate(frameCount * rotationSpeed);

    // Translate to moon's position relative to the planet
    translate(distanceFromPlanet+distanceFromSun, 0);

    // Draw the moon sphere
    sphere(8, 20, 20);
    pop();

}

  static createStarfield(numStars, starPositions) {
    // Set seed
    randomSeed(100);

    // Generate star positions once
    if (starPositions.length == 0) {
      for (let i = 0; i < numStars; i++) {
        starPositions.push({
          x: random(-width/2, width/2),
          y: random(-height/2, height/2),
        });
      }
    }
  
    for (let star of starPositions) {
      // Draw the stars
      strokeWeight(3);
      stroke(random(180,255),random(180,255),random(180,255));
      point(star.x, star.y);
    }
  
  }
}
