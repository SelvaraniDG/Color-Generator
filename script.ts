const container = document.querySelector('.container') as HTMLElement;
const colorCard = document.querySelector('.color-card') as HTMLElement;
const btn = document.querySelector('button') as HTMLButtonElement;
const hex = document.getElementById('hex') as HTMLSpanElement;
const colorSlider = document.getElementById('colorSlider') as HTMLInputElement;

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
});