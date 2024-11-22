class SpaceObject {

  constructor(objectRadius, objectRotationSpeed, objectSubdivision, objectTexture, objectDistance, objectHasMoon = false,objectColor = null) {
    this.radius = objectRadius;
    this.subdivision = objectSubdivision;
    this.texture = objectTexture;
    this.distance = objectDistance;
    this.rotationSpeed = objectRotationSpeed;
    this.hasMoon = objectHasMoon;
    this.color = objectColor;
  }

  createSpaceObject() {
    // Disable wireframe
    noStroke();
    
    this.loadSurface(this.texture,this.color);

    // Rotate around the sun
    rotate(frameCount * this.rotationSpeed);

    // Translate to its position
    translate(this.distance, 0);

    // Rotate around its own axis
    rotateZ(frameCount * 0.01);

    // Draw the sphere
    sphere(this.radius, this.subdivision, this.subdivision);

  }
  
  createMoon(moonSize, distanceFromPlanet, rotationSpeed, moonTexture) {
    if(this.hasMoon) {
      // Disable wireframe
      noStroke();

      this.loadSurface(moonTexture, this.color);
      
      push();
      // Rotate the moon around its parent planet
      rotate(frameCount * rotationSpeed);

      // Translate to moon's position relative to the planet
      translate(distanceFromPlanet+5, 0);

      // Draw the moon sphere
      sphere(moonSize, 20, 20);
      pop();
    }
  }

  loadSurface(txtr, clr = null) {
    if(txtr == null) {
      // Add the color
      ambientLight(clr[0], clr[1], clr[2]);
      ambientMaterial(255)
    }
    else {
      // Load the texture for the celestial object
      texture(txtr);
    }
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
