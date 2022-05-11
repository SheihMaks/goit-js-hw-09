const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let changeColorAtInterval = null;

refs.btnStop.setAttribute('disabled', true);

const onChangeColorAtInterval = () => {
  refs.body.style.backgroundColor = getRandomHexColor();
};

const onClickBtnStart = ev => {
  changeColorAtInterval = setInterval(onChangeColorAtInterval, 1000);
  refs.btnStop.disabled = false;
  refs.btnStart.setAttribute('disabled', true);
};

const onClickBtnStop = ev => {
  clearInterval(changeColorAtInterval);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStart.addEventListener('click', onClickBtnStart);
refs.btnStop.addEventListener('click', onClickBtnStop);
