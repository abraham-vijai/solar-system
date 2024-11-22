class UI {
    constructor(parentElementId = null) {
        // Optionally attach the UI elements to a parent container
        this.parent = parentElementId ? select(`#${parentElementId}`) : null;
    }

    // Varibles to store UI elements
    static UI_starCount;
    static UI_earthSunDistance;
    static UI_earthRotationSpeed;
    static UI_moonEarthDistance;
    static UI_moonRotationSpeed;
    static UI_planetRotationSpeed;
    static UI_planetSize;
    static UI_planetSunDistance;
    static UI_planetColor;
    static UI_planetMoonColor;
    static UI_planetHasMoon;
    static UI_planetMoonRotationSpeed;
    static UI_planetMoonSize;
    static UI_planetMoonDistance;

    // Create a label
    createLabel(text, x = 0, y = 0) {
        let label = createElement('label', text);
        label.position(x, y);
        if (this.parent) label.parent(this.parent);
        return label;
    }

    // Create a button
    createButton(label, x = 0, y = 0, callback = null) {
        let button = createButton(label);
        button.position(x, y);
        if (callback) button.mousePressed(callback);
        if (this.parent) button.parent(this.parent);
        return button;
    }

    // Create a slider
    createSlider(min, max, value, step, x = 0, y = 0) {
        let slider = createSlider(min, max, value, step);
        slider.position(x, y);
        if (this.parent) slider.parent(this.parent);

        // Create a label for the slider's value
        let valueLabel = createElement('span', value);
        valueLabel.position(x + slider.width + 50, y); // Position next to the slider
        if (this.parent) valueLabel.parent(this.parent);

        // Update label as the slider value changes
        slider.input(() => {
            valueLabel.html(slider.value());
        });

        return slider;
    }

    // Create a color picker
    createColorPicker(defaultColor = '#000000', x = 0, y = 0) {
        let colorPicker = createColorPicker(defaultColor);
        colorPicker.position(x, y);
        if (this.parent) colorPicker.parent(this.parent);
        return colorPicker;
    }

    // Create a text box
    createTextBox(placeholder = '', x = 0, y = 0) {
        let input = createInput('');
        input.position(x, y);
        input.attribute('placeholder', placeholder);
        if (this.parent) input.parent(this.parent);
        return input;
    }

    // Create a checkbox
    createCheckbox(labelText, isChecked = false, x = 0, y = 0) {
        let checkbox = createCheckbox(labelText, isChecked);
        checkbox.position(x, y);
        if (this.parent) checkbox.parent(this.parent);
        return checkbox;
    }

    static setupUI() {
        ui = new UI();

        let xOffset = width + 10; // Starting x position
        let yOffset = 0;  // Starting y position
        let ySpacing = 20;
        let gap = 40;  // Vertical space between rows

        // Number of Stars
        ui.createLabel('Number of Stars:', xOffset, yOffset)
        yOffset += ySpacing;
        this.UI_starCount = ui.createTextBox('100', xOffset, yOffset);
        ui.createButton('Update Stars', xOffset + 170, yOffset, ButtonAction.updateStarCount);

        // Earth Distance From Sun
        yOffset += gap;
        ui.createLabel('Earth Distance From Sun:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_earthSunDistance = ui.createSlider(0, width / 2, 200, 5, xOffset, yOffset);

        // Earth Rotation Speed
        yOffset += gap;
        ui.createLabel('Earth Rotation Speed:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_earthRotationSpeed = ui.createSlider(0, .05, .02, .001, xOffset, yOffset);

        // Moon Distance From Earth
        yOffset += gap;
        ui.createLabel('Moon Distance From Earth:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_moonEarthDistance = ui.createSlider(0, 50, 30, 1, xOffset, yOffset);

        // Moon Rotation Speed
        yOffset += gap;
        ui.createLabel('Moon Rotation Speed:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_moonRotationSpeed = ui.createSlider(0, .05, .02, .001, xOffset, yOffset);

        // Custom Planet Size:
        yOffset += gap;
        ui.createLabel('Custom Planet Size:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_planetSize = ui.createSlider(0, 100, 20, 1, xOffset, yOffset);

        // Custom Color
        yOffset += gap;
        ui.createLabel('Custom Planet Color:', xOffset, yOffset);
        ui.createLabel('Custom Moon Color:', xOffset + 150, yOffset);
        yOffset += ySpacing;
        this.UI_planetColor = ui.createColorPicker('yellow', xOffset, yOffset);
        this.UI_planetMoonColor = ui.createColorPicker('red', xOffset + 150, yOffset);

        // Custom Planet Rotation Speed
        yOffset += gap;
        ui.createLabel('Custom Planet Rotation Speed:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_planetRotationSpeed = ui.createSlider(0, .05, .02, .001, xOffset, yOffset);

        // Custom Planet Distance From Sun
        yOffset += gap;
        ui.createLabel('Custom Planet Distance From Sun:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_planetSunDistance = ui.createSlider(0, width / 2, 100, 5, xOffset, yOffset);

        // Planet Has Moon
        yOffset += gap;
        ui.createLabel('Has Moon:', xOffset, yOffset);
        this.UI_planetHasMoon = ui.createCheckbox('', false, xOffset + 170, yOffset)

        // Custom Moon Distance From Planet
        yOffset += gap;
        ui.createLabel('Custom Moon Distance From Planet:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_planetMoonDistance = ui.createSlider(0, 50, 30, 1, xOffset, yOffset);

        // Custom Moon Rotation Speed
        yOffset += gap;
        ui.createLabel('Custom Moon Rotation Speed:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_planetMoonRotationSpeed = ui.createSlider(0, .05, .02, .001, xOffset, yOffset);

        // Custom Moon Size
        yOffset += gap;
        ui.createLabel('Custom Moon Size:', xOffset, yOffset);
        yOffset += ySpacing;
        this.UI_planetMoonSize = ui.createSlider(0, 100, 10, 5, xOffset, yOffset);

        yOffset -= 10;
        ui.createButton('Add Planet', 10, yOffset, ButtonAction.addPlanet);
        ui.createButton('Remove Last Planet', 110, yOffset, ButtonAction.removeLastPlanet)
        ui.createButton('Pause/Resume', 110 + 160, yOffset, ButtonAction.pauseResume)
        ui.createButton('Reset', 110 + 160 + 130, yOffset, ButtonAction.resetSystem)
    }

}
