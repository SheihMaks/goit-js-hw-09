import Notiflix from 'notiflix';
const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}

const onSubmit = event => {
  event.preventDefault();
  const delay = event.currentTarget.elements.delay.value;
  const step = event.currentTarget.elements.step.value;
  const amount = event.currentTarget.elements.amount.value;

  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => {
      createPromise(i + 1, +delay + i * +step)
        .then(message => Notiflix.Notify.success(message))
        .catch(message => Notiflix.Notify.failure(message));
    }, +delay + i * +step);
  }
  event.currentTarget.reset();
};
formRef.addEventListener('submit', onSubmit);
