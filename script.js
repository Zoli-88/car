// ===== Variables =====
// DOM Elements
// Scale related
const $rangeLabel = document.querySelector('label[for="scale"]');
const $rangeInput = document.querySelector('input[id="scale"]');
const $car = document.querySelector('.car-svg');

// Color related
const $bodyColorInput = document.querySelector('input[id="body-color"]');

// Body
const $bodyFrontColor = document.querySelector('[id="body-front-color"]');
const $bodyBackColor = document.querySelector('[id="body-back-color"]');

// Windows
const $windowColorInput = document.querySelector('input[id="window-color"]');
const $sideWindowColor = document.querySelector('[id="side-window-color"]');
const $frontWindowColor = document.querySelector('[id="front-window-color"]');

const car = {
  // Car scale related properties
  initialZoomLevel: 50,
  initialScaleValue: 1,
  minScaleValue: 0.75,
  maxScaleValue: 1.25,
  minInputRange: 1,
  maxInputRange: 100,
  // Car color related properties
  bodyColor: {
    front: $bodyFrontColor,
    back: $bodyBackColor
  },
  windowColor: {
    front: $frontWindowColor,
    side: $sideWindowColor
  },
  // Methods
  // Color related
  paintCarBody(color) {
    const darkenPercent = 30;
    this.bodyColor.front.setAttribute('stop-color', color);
    this.bodyColor.back.setAttribute('stop-color', darkenColor(color, darkenPercent));
  },
  paintCarWindows(color) {
    this.windowColor.front.setAttribute('stop-color', color);
    this.windowColor.side.setAttribute('stop-color', color);
  },
  // Scale related
  initialScale() {
    $car.style.transform = `scale(${this.initialScaleValue})`;
  },
  scaleCar(value) {
    const scaleValue = Math.round(Number(value));
    $car.style.transform = `scale(${mapValue(scaleValue, this.minInputRange, this.maxInputRange, this.minScaleValue, this.maxScaleValue)})`;
    car.displayZoomLevel(scaleValue);
  },
  displayInitialZoomLevel() {
    $rangeLabel.textContent = `Zoom level: ${this.initialZoomLevel}%`;
  },
  displayZoomLevel(value) {
    $rangeLabel.textContent = `Zoom level: ${value}%`;
  }
}

// Initialize car scale with the default value and display the initial zoom level
car.initialScale();
car.displayInitialZoomLevel();

// ===== Event Listeners =====
$rangeInput.addEventListener('input', function() {car.scaleCar(this.value)});
$bodyColorInput.addEventListener('input', function() {car.paintCarBody(this.value)});
$windowColorInput.addEventListener('input', function() {car.paintCarWindows(this.value)});

// ===== Functions =====
// Helper functions
function mapValue(value, minInput, maxInput, minOutput, maxOutput) {
  return minOutput + ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput);
}

function darkenColor(hexColor, percent) {
  // Remove '#' from color
  hexColor = hexColor.replace('#', '');

  // Convert hex to RGB
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);

  // Darken RGB values by given percentage
  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));

  // Ensure RGB values stay within valid range (0-255)
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  // Convert RGB back to hex
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}