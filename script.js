// ===== Variables =====
// DOM Elements
const $rangeInput = document.querySelector('input[id="scale"]');
const $car = document.querySelector('.car-svg');

// Initial scale of the car (default)
const initialScaleValue = 1;

// Initialize car scale with the default value
scaleCar();

// ===== Event Listeners =====
$rangeInput.addEventListener('input', scaleCar);

// ===== Functions =====
function scaleCar() {
  const scaleValue = Number(this.value) || initialScaleValue;
  $car.style.transform = `scale(${scaleValue})`;
}

