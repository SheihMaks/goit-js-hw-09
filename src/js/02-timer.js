import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const containerRef = document.querySelectorAll('.field');
const refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
};

refs.startButton.setAttribute('disabled', true);

let timer = null;
let userSelectedDate = null;
flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    let userDate = userSelectedDate > Date.now();
    if (!userDate) {
      alert('Please choose a date in the future');
      clearInterval(timer);
      onClockFace({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    onStartTimer(userSelectedDate);
  },
});

function onStartTimer() {
  refs.startButton.disabled = false;
  refs.startButton.addEventListener('click', () => onClickStartButton(userSelectedDate));
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function onClockFace(time) {
  containerRef.forEach((el, i) => {
    el.firstElementChild.textContent = addZero(Object.values(time)[i]);
  });
}

function onClickStartButton(date) {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    let ms = date - Date.now();
    if (ms < 0) {
      clearInterval(timer);
      return;
    }
    let time = convertMs(ms);
    onClockFace(time);
  }, 1000);
  if (timer) {
    refs.startButton.disabled = true;
  }
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
