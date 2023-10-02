const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(cors);
const expressServer = app.listen(PORT);
const socketio = require('socket.io');
const io = socketio(expressServer);

module.exports = {
  app,
  io,
};
