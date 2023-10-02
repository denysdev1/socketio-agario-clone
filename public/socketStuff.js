const socket = io.connect('http://localhost:8000');

socket.on('init', (initData) => {
  orbs = initData.orbs;
});
