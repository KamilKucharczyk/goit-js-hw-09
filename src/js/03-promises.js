// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
import Notiflix from 'notiflix';

const firstDelay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amountPromises = document.querySelector('[name="amount"]');
const submitBtn = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

submitBtn.addEventListener('submit', handleClick);

function handleClick(event) {
  event.preventDefault();

  let delay = parseInt(firstDelay.value);
  let step = parseInt(delayStep.value);
  let amount = parseInt(amountPromises.value);

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          clickToClose: true,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          clickToClose: true,
        });
      });
    delay += step;
  }
}
