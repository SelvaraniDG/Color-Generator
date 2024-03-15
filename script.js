var container = document.querySelector('.container');
var colorCard = document.querySelector('.color-card');
var btn = document.querySelector('button');
var hex = document.getElementById('hex');
var colorSlider = document.getElementById('colorSlider');
var colorPicker = document.getElementById('colorPicker');
var colorSelect = document.getElementById('colorSelect');
colorPicker.value = '#f77754';
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
    updateColorPicker(color);
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
    updateColorPicker(color);
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
    colorPicker.value = "#".concat(hslToHex(hue, 100, 50));
});
function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    var r, g, b;
    if (s === 0) {
        r = g = b = l;
    }
    else {
        var hue2rgb = function (p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    var toHex = function (x) {
        var hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return toHex(r) + toHex(g) + toHex(b);
}
function updateColor(color) {
    container.style.background = color;
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
    updateColorPicker(color);
}
function updateColorPicker(color) {
    colorPicker.value = color;
}
colorPicker.addEventListener('input', function () {
    var color = this.value;
    updateColor(color);
});
colorSelect.addEventListener('change', function () {
    var color = this.value;
    updateColor(color);
    colorPicker.value = color;
});
