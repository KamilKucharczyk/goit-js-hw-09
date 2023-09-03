import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

// Counter styles
const divTimer = document.querySelector('.timer');
const divField = document.querySelectorAll('.field');
const spanLabel = document.querySelectorAll('.label');
const spanValue = document.querySelectorAll('.value');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    datetimePicker(selectedDates);
  },
};

let intervalId = 0;

startBtn.disabled = true;

flatpickr('#datetimePicker', { ...options });

function datetimePicker(selectedDates) {
  if (selectedDates[0].getTime() <= new Date()) {
    Notify.failure('Please choose a date in the future', {
      clickToClose: true,
    });
    startBtn.disabled = true;
    return;
  } else {
    startBtn.disabled = false;
  }
}

startBtn.addEventListener('click', handleclick);

function handleclick() {
  startBtn.disabled = true;
  input.disabled = true;

  intervalId = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const targetDate = new Date(input.value);
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference < 0) {
      clearInterval(intervalId);
      startBtn.disabled = true;

      daysCounter.textContent = '00';
      hoursCounter.textContent = '00';
      minutesCounter.textContent = '00';
      secondsCounter.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysCounter.textContent = addLeadingZero(days);
    hoursCounter.textContent = addLeadingZero(hours);
    minutesCounter.textContent = addLeadingZero(minutes);
    secondsCounter.textContent = addLeadingZero(seconds);

    startBtn.disabled = false;
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

divTimer.style.display = 'flex';
divTimer.style.gap = '20px';
divField.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
});
spanLabel.forEach(label => {
  label.style.textTransform = 'uppercase';
  label.style.fontSize = '8px';
});
spanValue.forEach(val => {
  val.style.fontSize = '20px';
});
