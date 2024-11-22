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
  static starCount = 100;
  static starArray = [];
  
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
    if (txtr == null) {
      // Use ambient and directional light to enhance the 3D look
      ambientLight(150); // General ambient light
      directionalLight(255, 255, 255, 0, 0, -1); // Add a light shining from the camera direction
  
      // Set material properties based on the provided color
      if (clr) {
        ambientMaterial(clr[0], clr[1], clr[2]); // Apply ambient color
      } else {
        ambientMaterial(255); // Default white material
      }
    } else {
      // Load the texture for the celestial object
      // ambientLight(150); // General ambient light
      // directionalLight(255, 255, 255, 0, 0, -1); // Ensure proper shading for the texture
      texture(txtr); // Apply the texture
    }
  }
  
  static setStarCount(newStarCount){
    this.starCount = newStarCount;
  }

  static createStarfield() {
    // Set seed
    randomSeed(100);

    // Generate star positions once
    if (this.starArray.length == 0) {
      for (let i = 0; i < this.starCount; i++) {
        this.starArray.push({
          x: random(-width/2, width/2),
          y: random(-height/2, height/2),
        });
      }
    }
  
    for (let star of this.starArray) {
      // Draw the stars
      strokeWeight(3);
      stroke(random(180,255),random(180,255),random(180,255));
      point(star.x, star.y);
    }
  
  }
}
