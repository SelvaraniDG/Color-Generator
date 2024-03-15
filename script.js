var container = document.querySelector('.container');
var colorCard = document.querySelector('.color-card');
var btn = document.querySelector('button');
var hex = document.getElementById('hex');
var colorSlider = document.getElementById('colorSlider');
var colorPicker = document.getElementById('colorPicker');
function generateRandomColor() {
    var symbols = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += symbols[Math.floor(Math.random() * 16)];
    }
    return color;
}
//slider value
function updateColorFromSlider(hue) {
    var color = "hsl(".concat(hue, ", 100%, 50%)");
    container.style.background = color;
    document.body.style.background = color;
    hex.textContent = color;
    var brightness = calculateBrightness(color);
    // Set text color and border color of button and hex code based on brightness
    if (brightness > 0.5) {
        btn.style.color = '#000';
        btn.style.borderColor = '#000';
        hex.style.color = '#000';
    }
    else {
        btn.style.color = '#fff';
        btn.style.borderColor = '#fff';
        hex.style.color = '#fff';
    }
}
// generate random color
function handleButtonClick() {
    var color = generateRandomColor();
    container.style.background = color;
    document.body.style.background = color;
    hex.textContent = color;
    var brightness = calculateBrightness(color);
    // Set text color and border color of button and hex code based on brightness
    if (brightness > 0.5) {
        btn.style.color = '#000';
        btn.style.borderColor = '#000';
        hex.style.color = '#000';
    }
    else {
        btn.style.color = '#fff';
        btn.style.borderColor = '#fff';
        hex.style.color = '#fff';
    }
}
// calculate brightness
function calculateBrightness(color) {
    // Convert color to RGB
    var rgb = color.substring(1); // remove #
    var r = parseInt(rgb.substring(0, 2), 16); // red 
    var g = parseInt(rgb.substring(2, 4), 16); // green 
    var b = parseInt(rgb.substring(4, 6), 16); // blue 
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}
btn.addEventListener("click", handleButtonClick);
colorSlider.addEventListener('input', function () {
    var hue = Number(this.value);
    updateColorFromSlider(hue);
});
function updateColor(color) {
    document.body.style.background = color;
    hex.textContent = color;
    var brightness = calculateBrightness(color);
    if (brightness > 0.5) {
        btn.style.color = '#000';
        hex.style.color = '#000';
        btn.style.borderColor = '#000';
    }
    else {
        btn.style.color = '#fff';
        hex.style.color = '#fff';
        btn.style.borderColor = '#fff';
    }
}
colorPicker.addEventListener('input', function () {
    var color = this.value;
    updateColor(color);
});
