// ===== Variables =====
// DOM Elements
// Car
const $car = document.querySelector('.car-svg');

// Scale related
const $rangeLabel = document.querySelector('label[for="scale"]');
const $rangeInput = document.querySelector('input[id="scale"]');
const $zoomLevelResetBtn = document.querySelector('[data="zoom-level-reset"]');

// Color related
const $bodyColorInput = document.querySelector('input[id="body-color"]');
const $glossGradientColors = document.querySelectorAll('[data="gloss-gradient-colors"]');

// Body
const $bodyFrontColor = document.querySelector('[data="body-front-color"]');
const $bodyBackColor = document.querySelector('[data="body-back-color"]');

// Headlights
const $leftHeadlight = document.querySelector('[data="left-headlight"]');
const $rightHeadlight = document.querySelector('[data="right-headlight"]');

// Windows
const $windowColorInput = document.querySelector('input[id="window-color"]');
const $sideWindowFrontColor = document.querySelector('[data="side-window-color-front"]');
const $sideWindowBackColor = document.querySelector('[data="side-window-color-back"]');
const $frontWindowColorLeft = document.querySelector('[data="front-window-color-left"]');
const $frontWindowColorRight = document.querySelector('[data="front-window-color-right"]');

// Wheels
const $wheelsRimColorInput = document.querySelector('input[id="wheels-rim-color"]');
const $wheelsRimColorOuter = document.querySelectorAll('[data="wheels-rim-outer-side"]');
const $wheelsRimColorInner = document.querySelectorAll('[data="wheels-rim-inner-side"]');

// Finish
const $finishTypeInput = document.querySelectorAll('input[name="finish"]');
const $bodyFinish = document.querySelector('[data="body-finish"]');

// SVG Gradients
const matteFinish = 'url(#paint4_linear_3_405)';
const glossFinish = 'url(#paint12_linear_3_405)';

// Controls
const $breakPedal = document.querySelector('[data="break-pedal"]');

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
    back: $bodyBackColor,
    finish: $bodyFinish
  },
  windowColor: {
    front: {
      left: $frontWindowColorLeft,
      right: $frontWindowColorRight
    },
    side: {
      front: $sideWindowFrontColor,
      back: $sideWindowBackColor
    }
  },
  wheelsColor: {
    outerRims: $wheelsRimColorOuter,
    innerRims: $wheelsRimColorInner
  },
  engine: {
    pedals: {
      break: $breakPedal
    }
  },
  headLights : {
    left: $leftHeadlight,
    right: $rightHeadlight
  },
  // Methods
  // Color related
  paintCarBody(color) {
    const darkenPercent = 30;
    this.bodyColor.front.setAttribute('stop-color', color);
    this.bodyColor.back.setAttribute('stop-color', darkenColor(color, darkenPercent));
    $glossGradientColors.forEach((color) => color.setAttribute('stop-color', this.bodyColor.front.getAttribute('stop-color')));
  },
  paintCarWindows(color) {
    const darkenPercent = 70;
    this.windowColor.front.left.setAttribute('stop-color', color);
    this.windowColor.front.right.setAttribute('stop-color', darkenColor(color, darkenPercent));
    this.windowColor.side.front.setAttribute('stop-color', color);
    this.windowColor.side.back.setAttribute('stop-color', darkenColor(color, darkenPercent));
  },
  paintWheels(color) {
    const darkenPercent = 50;
    this.wheelsColor.outerRims.forEach(function(wheel) {
      wheel.setAttribute('stop-color', color);
    });
    this.wheelsColor.innerRims.forEach(function(wheel) {
      wheel.setAttribute('fill', darkenColor(color, darkenPercent));
    });
  },
  // Finish related
  applyFinish(type) {
    if (type.value === "matte") {
      this.bodyColor.finish.setAttribute('fill', matteFinish);
    } else if (type.value === "gloss") {
      this.bodyColor.finish.setAttribute('fill', glossFinish);
    }
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
    $rangeLabel.textContent = `Level: ${this.initialZoomLevel}%`;
  },
  displayZoomLevel(value) {
    $rangeLabel.textContent = `Level: ${value}%`;
  },
  resetZoomLevel() {
    this.initialScale();
    this.displayInitialZoomLevel();
    $rangeInput.value = this.initialZoomLevel;
  },
  // Engine controls
  pressBreak() {
    this.engine.pedals.break.classList.add('active');
    this.headLights.left.setAttribute('stroke', 'red');
    this.headLights.right.setAttribute('stroke', 'red');
  },
  releaseBreak() {
    this.engine.pedals.break.classList.remove('active');
    this.headLights.left.setAttribute('stroke', 'white');
    this.headLights.right.setAttribute('stroke', 'white');
  }
}

// Initialize car scale with the default value and display the initial zoom level
car.initialScale();
car.displayInitialZoomLevel();

// ===== Event Listeners =====
// Inputs
$rangeInput.addEventListener('input', function() {car.scaleCar(this.value)});
$bodyColorInput.addEventListener('input', function() {car.paintCarBody(this.value)});
$windowColorInput.addEventListener('input', function() {car.paintCarWindows(this.value)});
$wheelsRimColorInput.addEventListener('input', function() {car.paintWheels(this.value)});
$finishTypeInput.forEach((type) => type.addEventListener('change', function() {car.applyFinish(type)}));

// Buttons
$zoomLevelResetBtn.addEventListener('click', function() {car.resetZoomLevel()});
$breakPedal.addEventListener('mousedown', function() {car.pressBreak()});
$breakPedal.addEventListener('mouseup', function() {car.releaseBreak()});

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