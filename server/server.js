// Global variables
const { instrument } = require("@socket.io/admin-ui");
const webSocketIo = require("socket.io")(3080, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"],
  },
});
const userIO = webSocketIo.of('/user');
// Global variables end

// callbacks start

/**
 * @description - 'send-message' event call back: it takes message from the sender and send it to all other users, specific user, or users of a specific room.
 * @param message - The message sended by user.
 * @param room - The specific user or room id to send message to .
 */
const sendMessageCB = (message, room) => {
  if (room.trim().length > 0) {
    console.log(room);
    socket.broadcast.to(room.trim()).emit("rescieve-message", message);
    return;
  }
  socket.broadcast.emit("rescieve-message", message);
};

/**
 * @description - 'join-room' event call back: it makes user join the specified room and runs a callback.
 * @param room - The room name to join to.
 * @param cb - The callback function to run after joining (It's usually a notification or a message to tell user that he joined succefully).
 */
const joinRoomCB = (room, cb) => {
  socket.join(room);
  cb("You are connected to (( " + room + " ))");
};

/**
 * @description - 'connection' event call back: It prints the id of the connected user along with running event listeners.
 * @param socket - The connected socket info.
 */
const connectionCB = (socket) => {
  console.log(socket.id);

  /**
   * @description - Socket 'send-message' listener.
   * @param event - The event we want listen to.
   * @param Listener - The call back to run on the event.
   */
  socket.on("send_message", sendMessageCB);

  /**
   * @description - Socket 'join-room' listener.
   * @param event - The event we want listen to.
   * @param Listener - The call back to run on the event.
   */
  socket.on("join-room", joinRoomCB);
};

// callbacks end


userIO.on('connection', userSocket => {
    console.log('You are connected to user namespace "'+userSocket.id+'".')
})

/**
 * @description - Socket 'connection' listener.
 * @param event - The event we want listen to.
 * @param Listener - The call back to run on the event.
 */
webSocketIo.on("connection", connectionCB);

console.log("Hi");

instrument(webSocketIo, {
  auth: false,
});
