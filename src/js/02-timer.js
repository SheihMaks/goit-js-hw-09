import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const inputRef = document.querySelector('#datetime-picker');
flatpickr(inputRef, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});
