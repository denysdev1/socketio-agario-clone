const socket = io.connect();

const init = async () => {
  const initData = await socket.emitWithAck('init', {
    playerName: player.name,
  });
  setInterval(() => {
    socket.emit('tock', {
      xVector: player.xVector ?? 0.1,
      yVector: player.yVector ?? 0.1,
    });
  }, 16);
  orbs = initData.orbs;
  player.indexInPlayers = initData.indexInPlayers;
  draw();
};

socket.on('tick', (playersArray) => {
  const scoreEl = document.querySelector('.player-score');
  players = playersArray;

  if (players[player.indexInPlayers].playerData) {
    player.locX = players[player.indexInPlayers].playerData.locX;
    player.locY = players[player.indexInPlayers].playerData.locY;
    scoreEl.innerHTML = players[player.indexInPlayers].playerData.score;
  }
});

socket.on('orbSwitch', (orbData) => {
  orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb);
});

socket.on('playerAbsorbed', (absorbData) => {
  const gameMessageEl = document.querySelector('#game-message');
  gameMessageEl.innerHTML = `${absorbData.absorbed} was absorbed by ${absorbData.absorbedBy}`;
  gameMessageEl.style.opacity = 1;

  window.setTimeout(() => {
    gameMessageEl.style.opacity = 0;
  }, 2000);
});

socket.on('updateLeaderBoard', (leaderBoardArray) => {
  leaderBoardArray.sort((a, b) => b.score - a.score);
  const leaderBoardEl = document.querySelector('.leader-board');

  leaderBoardEl.innerHTML = '';
  leaderBoardArray.forEach((p) => {
    if (!p.name) return;

    leaderBoardEl.innerHTML += `<li class="leaderboard-player">${p.name} - ${p.score}</li>`;
  });
});
