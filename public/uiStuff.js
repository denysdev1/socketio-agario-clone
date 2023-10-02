let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
let orbs = [];
const canvas = document.querySelector('#the-canvas');
const context = canvas.getContext('2d');
const player = {};
const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const spawnModal = new bootstrap.Modal(document.querySelector('#spawnModal'));

canvas.height = wHeight;
canvas.width = wWidth;

window.addEventListener('load', () => {
  loginModal.show();
});

document.querySelector('.name-form').addEventListener('submit', (e) => {
  e.preventDefault();
  player.name = document.querySelector('#name-input').value;
  document.querySelector('.player-name').innerHTML = player.name;
  loginModal.hide();
  spawnModal.show();
});

document.querySelector('.start-game').addEventListener('click', () => {
  spawnModal.hide();

  const elArray = document.querySelectorAll('.hiddenOnStart');

  elArray.forEach((el) => {
    el.removeAttribute('hidden');
  });

  init();
});
