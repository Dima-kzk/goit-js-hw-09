function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function startChangeColor() {
  body.style.backgroundColor = getRandomHexColor();
  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', '');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
}

stopBtn.setAttribute('disabled', '');

startBtn.addEventListener('click', startChangeColor);

stopBtn.addEventListener('click', stopChangeColor);
