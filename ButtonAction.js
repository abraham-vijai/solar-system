/*
Filename    : ButtonAction.js
Author      : Abraham Vijai
Date        : 2024-11-23
Description : This is the ButtonAction.js class which contains the event handlers for all the buttons
*/

/*
Name        : ButtonAction
Description : Handles user interactions for managing planets, starfields, and system states (e.g., pause, reset).
*/
class ButtonAction {
    constructor(parameters) { }

    static isPaused = false;

    /*
    Method name  : removeLastPlanet
    Description  : Removes the last planet from the planet array, if any exists.
    Parameters   : None
    Return value : None
    */
    static removeLastPlanet() {
        // Check if array is not empty
        if (SpaceObject.planetArray.length > 0) {
            // Remove the last planet in the array
            SpaceObject.planetArray.pop();
        }
    }

    /*
    Method name  : updateStarCount
    Description  : Updates the number of stars in the starfield by clearing the existing star array
                   and setting the star count based on the UI slider value.
    Parameters   : None
    Return value : None
    */
    static updateStarCount() {
        // Empty the array
        SpaceObject.starArray = [];

        // Set the star count value
        SpaceObject.setStarCount(UI.UI_starCount.value());
    }

    /*
    Method name  : resetSystem
    Description  : Resets the system by clearing the planet array, removing all planets from the scene.
    Parameters   : None
    Return value : None
    */
    static resetSystem() {
        // Empty the array
        SpaceObject.planetArray = [];
    }

    /*
    Method name  : pauseResume
    Description  : Toggles the system's animation state between paused and running.
    Parameters   : None
    Return value : None
    */
    static pauseResume() {
        if (this.isPaused) {
            loop();
            this.isPaused = false;
        } else {
            noLoop();
            this.isPaused = true;
        }
    }

    /*
    Method name  : addPlanet
    Description  : Adds a new planet to the planet array with properties specified by the UI sliders. 
                   If the planet has a moon, moon properties are also set.
    Parameters   : None
    Return value : None
    */
    static addPlanet() {
        let newPlanet;

        // Store the new planet in the array
        SpaceObject.planetArray.push(
            newPlanet = new SpaceObject(
                UI.UI_planetSize.value(),
                UI.UI_planetRotationSpeed.value(),
                15,
                null,
                UI.UI_planetSunDistance.value(),
                UI.UI_planetHasMoon.checked(),
                UI.UI_planetColor.value()
            )
        );

        // Set moon values if the planet has a moon
        if (UI.UI_planetHasMoon.checked()) {
            newPlanet.setMoonValues(
                UI.UI_planetMoonSize.value(),
                UI.UI_planetMoonRotationSpeed.value(),
                UI.UI_planetMoonDistance.value(),
                null
            );
        }
    }
}
