/*
Filename    : ButtonAction.js
Author      : Abraham Vijai
Date        : 2024-11-24
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
        if (planetsArray.length > 0) {
            // Remove the last planet in the array
            planetsArray.pop();
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
        starArray = [];

        // Set the star count value
        setStarCount(UI.UI_starCount.value());
    }

    /*
    Method name  : resetSystem
    Description  : Resets the system by clearing the planet array, removing all planets from the scene.
    Parameters   : None
    Return value : None
    */
    static resetSystem() {
        // Empty the array
        planetsArray = [];
        
        // Reload the page
        window.location.reload();

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
        let newPlanet = new Planet(
            UI.UI_planetSize.value(),
            UI.UI_planetRotationSpeed.value(),
            15, // subdivision
            null, // texture
            UI.UI_planetSunDistance.value(),
            UI.UI_planetHasMoon.checked(),
            UI.UI_planetColor.value()
        );
    
        if (UI.UI_planetHasMoon.checked()) {
            let newMoon = new Moon(
                UI.UI_planetMoonSize.value(),
                UI.UI_planetMoonDistance.value(),
                UI.UI_planetMoonRotationSpeed.value(),
                null // texture
            );
            planetsArray.push([newPlanet, newMoon]); // Add both planet and moon
        } else {
            planetsArray.push([newPlanet]); // Add just the planet
        }

    }
}
