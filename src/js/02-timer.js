import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

Notify.init({
  clickToClose: true,
  position: 'center-top',
});

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', '');

const valueSpan = document.querySelectorAll('.value');

let timerId = null;
let selectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log('selected date', selectedDates[0].getTime());
    // console.log('now', Date.now());
    const DateNow = Date.now();
    if (selectedDates[0].getTime() > DateNow) {
      startBtn.removeAttribute('disabled');
      selectDate = selectedDates[0].getTime();
    } else {
      startBtn.setAttribute('disabled', '');
      //alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
    }
  },
};

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

flatpickr(datetimePicker, options);

startBtn.addEventListener('click', () => {
  if (timerId !== null) return;
  function isStopCountdown(days, hours, minutes, seconds) {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      datetimePicker.removeAttribute('disabled');
      startBtn.setAttribute('disabled', '');
      clearInterval(timerId);
      timerId = null;
      valueSpan[0].textContent = '00';
      valueSpan[1].textContent = '00';
      valueSpan[2].textContent = '00';
      valueSpan[3].textContent = '00';
      return true;
    }
    return false;
  }
  //     0      1       2         3
  let { days, hours, minutes, seconds } = convertMs(selectDate - Date.now());
  if (isStopCountdown(days, hours, minutes, seconds)) return;
  valueSpan[0].textContent = days > 9 ? days : '0' + days;
  valueSpan[1].textContent = hours > 9 ? hours : '0' + hours;
  valueSpan[2].textContent = minutes > 9 ? minutes : '0' + minutes;
  valueSpan[3].textContent = seconds > 9 ? seconds : '0' + seconds;

  timerId = setInterval(() => {
    let { days, hours, minutes, seconds } = convertMs(selectDate - Date.now());
    if (isStopCountdown(days, hours, minutes, seconds)) return;
    valueSpan[0].textContent = days > 9 ? days : '0' + days;
    valueSpan[1].textContent = hours > 9 ? hours : '0' + hours;
    valueSpan[2].textContent = minutes > 9 ? minutes : '0' + minutes;
    valueSpan[3].textContent = seconds > 9 ? seconds : '0' + seconds;
  }, 1000);
  datetimePicker.setAttribute('disabled', '');
});
