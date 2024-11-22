class ButtonAction {
    constructor(parameters) {

    }

    static isPaused = false;

    static removeLastPlanet() {
        // Check if array is not empty
        if (SpaceObject.planetArray.length > 0) {

            // Remove the last planet in the array
            SpaceObject.planetArray.pop(); 
        }
    }

    static updateStarCount() {
        // Empty the array
        SpaceObject.starArray = [];

        // Set the star count value
        SpaceObject.setStarCount(UI.UI_starCount.value());
    }

    static resetSystem() {
        // Empty the array
        SpaceObject.planetArray = [];
    }

    static pauseResume() {
        if (this.isPaused) {
            loop();
            this.isPaused = false;
        }
        else {
            noLoop();
            this.isPaused = true;
        }
    }

    static addPlanet() {
        let newPlanet;

        // Store the new planet in the array
        SpaceObject.planetArray.push(newPlanet = new SpaceObject(
            UI.UI_planetSize.value(),
            UI.UI_planetRotationSpeed.value(),
            15,
            null,
            UI.UI_planetSunDistance.value(),
            UI.UI_planetHasMoon.checked(),
            UI.UI_planetColor.value()
        ));
    }

}