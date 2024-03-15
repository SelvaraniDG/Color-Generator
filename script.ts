const container = document.querySelector('.container') as HTMLElement;
const colorCard = document.querySelector('.color-card') as HTMLElement;
const btn = document.querySelector('button') as HTMLButtonElement;
const hex = document.getElementById('hex') as HTMLSpanElement;
const colorSlider = document.getElementById('colorSlider') as HTMLInputElement;
const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
const colorSelect = document.getElementById('colorSelect') as HTMLSelectElement;
colorPicker.value = '#f77754';

function generateRandomColor(): string {
    const symbols = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += symbols[Math.floor(Math.random() * 16)];
    }

    return color;
}

//slider value
function updateColorFromSlider(hue: number): void {
    const color = `hsl(${hue}, 100%, 50%)`;

    container.style.background = color;
    document.body.style.background = color;

    hex.textContent = color;
    updateColorPicker(color);

    const brightness = calculateBrightness(color);

    // Set text color and border color of button and hex code based on brightness
    if (brightness > 0.5) {
        btn.style.color = '#000'; 
        btn.style.borderColor = '#000'; 
        hex.style.color = '#000';
    } else {
        btn.style.color = '#fff'; 
        btn.style.borderColor = '#fff'; 
        hex.style.color = '#fff';
    }
}

// generate random color
function handleButtonClick(): void {
    const color = generateRandomColor();

    
    container.style.background = color;
    document.body.style.background = color;

    hex.textContent = color;
    updateColorPicker(color);

    const brightness = calculateBrightness(color);

    // Set text color and border color of button and hex code based on brightness
    if (brightness > 0.5) {
        btn.style.color = '#000'; 
        btn.style.borderColor = '#000'; 
        hex.style.color = '#000';
    } else {
        btn.style.color = '#fff'; 
        btn.style.borderColor = '#fff'; 
        hex.style.color = '#fff';
    }
}

// calculate brightness
function calculateBrightness(color: string): number {
    // Convert color to RGB
    const rgb = color.substring(1); // remove #
    const r = parseInt(rgb.substring(0, 2), 16); // red 
    const g = parseInt(rgb.substring(2, 4), 16); // green 
    const b = parseInt(rgb.substring(4, 6), 16); // blue 

    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}


btn.addEventListener("click", handleButtonClick);

colorSlider.addEventListener('input', function() {
    const hue = Number(this.value);
    updateColorFromSlider(hue);
    colorPicker.value = `#${hslToHex(hue, 100, 50)}`;
});

function hslToHex(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return toHex(r) + toHex(g) + toHex(b);
}


function updateColor(color: string) {
    container.style.background = color;
    document.body.style.background = color;
    hex.textContent = color;

    const brightness = calculateBrightness(color);

    if (brightness > 0.5) {
        btn.style.color = '#000';
        hex.style.color = '#000';
        btn.style.borderColor = '#000';
    } else {
        btn.style.color = '#fff';
        hex.style.color = '#fff';
        btn.style.borderColor = '#fff';
    }
    updateColorPicker(color);
}

function updateColorPicker(color: string): void {
    colorPicker.value = color;
}

colorPicker.addEventListener('input', function() {
    const color = this.value;

    updateColor(color);
});

colorSelect.addEventListener('change', function() {
    const color = this.value;
    updateColor(color);
    colorPicker.value = color;
});