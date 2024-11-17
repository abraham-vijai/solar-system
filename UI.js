class UI {
    constructor(parentElementId = null) {
        // Optionally attach the UI elements to a parent container
        this.parent = parentElementId ? select(`#${parentElementId}`) : null;
    }

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
}
