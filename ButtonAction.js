class ButtonAction {
    constructor(parameters) {

    }

    static removeLastPlanet() {
        if (planetArray.length > 0) {
            planetArray.pop(); // Remove the last planet in the array
        }
    }

    static updateStarCount() {
        // Empty the array
        SpaceObject.starArray = [];

        // Set the star count value
        SpaceObject.setStarCount(UI_starCount.value());
    }

    static resetSystem(params) {
        planetArray = [];
    }

    static pauseResume() {
        if (isPaused) {
            loop();
            isPaused = false;
        }
        else {
            noLoop();
            isPaused = true;
        }
    }

    static addPlanet() {
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
            UI_planetHasMoon.checked(),
            rgbColor
        ));
    }

}