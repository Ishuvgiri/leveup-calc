// Prices per hour
const RATES = {
  ps5: 300,
  pc: 100,
  netflix: 500,
  controller: 80
};

// Helper to fix floating point precision issues with Math.ceil
function preciseCeil(num) {
  return Math.ceil(num - 1e-9);
}

// Round duration to nearest 15 minutes with a 5-minute grace period
function roundWithGrace(minutes) {
  if (minutes <= 0) return 0;
  const remainder = minutes % 15;
  let rounded = minutes - remainder;
  if (remainder > 5) rounded += 15;
  return rounded;
}

// Convert "HH:MM" 24-hour time string to total minutes
function timeToMinutes(timeStr) {
  if (!timeStr) return null;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// Calculate price for service based on rounded minutes
function calculateServicePrice(service, roundedMinutes) {
  let perMinuteRate = RATES[service] / 60;
  return preciseCeil(roundedMinutes * perMinuteRate);
}

// Calculate controller price based on count and rounded usage minutes
function calculateControllerPrice(controllerCount, roundedMinutes) {
  if (controllerCount <= 0) return 0;
  let perMinuteRate = RATES.controller / 60;
  return preciseCeil(roundedMinutes * perMinuteRate * controllerCount);
}

function calculateTotalFromForm() {
  const platform = document.getElementById('platform').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  const controllerCount = parseInt(document.getElementById('controllerCount').value, 10);

  const controllerStart = document.getElementById('controllerStartTime').value;
  const controllerEnd = document.getElementById('controllerEndTime').value;

  const priceDisplay = document.getElementById('totalPrice');

  if (!startTime || !endTime) {
    priceDisplay.textContent = "Enter start and end times!";
    return;
  }

  let sessionStart = timeToMinutes(startTime);
  let sessionEnd = timeToMinutes(endTime);

  // Handle overnight session
  if (sessionEnd <= sessionStart) {
    sessionEnd += 24 * 60;
  }

  let sessionDuration = sessionEnd - sessionStart;
  let roundedSessionDuration = roundWithGrace(sessionDuration);

  let controllerDuration = 0;

  if (controllerCount > 0) {
    if (!controllerStart || !controllerEnd) {
      priceDisplay.textContent = "Enter controller usage times!";
      return;
    }

    let controllerStartMin = timeToMinutes(controllerStart);
    let controllerEndMin = timeToMinutes(controllerEnd);

    // Handle overnight controller usage
    if (controllerEndMin <= controllerStartMin) {
      controllerEndMin += 24 * 60;
    }

    // Check if controller usage completely outside session — error if so
    if (controllerEndMin <= sessionStart || controllerStartMin >= sessionEnd) {
      priceDisplay.textContent = "Controller usage time must overlap with session time!";
      return;
    }

    // Clamp controller usage within session time
    if (controllerStartMin < sessionStart) controllerStartMin = sessionStart;
    if (controllerEndMin > sessionEnd) controllerEndMin = sessionEnd;

    controllerDuration = controllerEndMin - controllerStartMin;

    if (controllerDuration < 0) {
      priceDisplay.textContent = "Invalid controller usage time!";
      return;
    }
  }

  let roundedControllerDuration = roundWithGrace(controllerDuration);

  // Calculate total price
  let total = calculateServicePrice(platform, roundedSessionDuration);

  if ((platform === 'ps5' || platform === 'pc') && controllerCount > 0) {
    total += calculateControllerPrice(controllerCount, roundedControllerDuration);
  }

  priceDisplay.textContent = `Rs ${total > 0 ? total : 0}`;
}

// Enable/disable controller time inputs based on controller count selection
document.getElementById('controllerCount').addEventListener('change', function () {
  const controllerStartInput = document.getElementById('controllerStartTime');
  const controllerEndInput = document.getElementById('controllerEndTime');
  if (this.value === "0") {
    controllerStartInput.disabled = true;
    controllerEndInput.disabled = true;
    controllerStartInput.value = "";
    controllerEndInput.value = "";
  } else {
    controllerStartInput.disabled = false;
    controllerEndInput.disabled = false;
  }
});

// Attach event listener to Calculate button
document.getElementById('calcBtn').addEventListener('click', calculateTotalFromForm);

// Initialize controller time inputs on page load
(function init() {
  const controllerCountSelect = document.getElementById('controllerCount');
  controllerCountSelect.dispatchEvent(new Event('change'));
})();
