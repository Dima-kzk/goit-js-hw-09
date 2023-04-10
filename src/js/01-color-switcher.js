function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function startColorChange() {
  body.style.backgroundColor = getRandomHexColor();
  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', '');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
}

stopBtn.setAttribute('disabled', '');

startBtn.addEventListener('click', startColorChange);

stopBtn.addEventListener('click', stopColorChange);
