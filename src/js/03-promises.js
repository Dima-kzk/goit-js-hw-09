import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Notify.init({});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('click', event => {
  event.preventDefault();

  const { delay, step, amount } = form;

  for (let i = 0; i < Number(amount.value); i++) {
    createPromise(i + 1, Number(delay.value) + i * Number(step.value))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
