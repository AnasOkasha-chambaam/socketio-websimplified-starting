// import {io} from 'socket.io-client';
import io from "socket.io-client/dist/socket.io.js";

// Global varaibales
const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

const socket = io("http://localhost:3080"); // 'admin' namespace
const userSocket = io("http://localhost:3080/user"); // 'user' namespace
// Global variables end

// Event listeners functions
/**
 * @description - 'rescieve-message' event listener: it displays rescieved message.
 * @param message - The rescieved message.
 */
let socketRescieveFunc = (message) => {
  displayMessage(message);
};

/**
 * @description - 'connect' event listener: it diplays a message that user is connected.
 */
let connectCB = () => {
  displayMessage("You'r connected with the id: " + socket.id);
  socket.on("rescieve-message", socketRescieveFunc);
}

/**
 * @description - user socket 'connect' event listener: it diplays a message that user is connected to 'user' namespace.
 */
let userConnectCB = () => {
  alert('connected');
}

/**
 * @description - If there is a message, it displays it, send it to all other users and resets the input value to nothing.
 * @param {Object} e - 'submit' event object.
 */
let formSubmitCB = (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;
  if (message === "") return;

  displayMessage(message);
  socket.emit("send_message", message, room);
  messageInput.value = "";
};

/**
 * @description - Join room with specific id.
 */
let joinRoomButtonCB = () => {
  const room = roomInput.value;
  socket.emit("join-room", room.trim(), displayMessage);
};
// Event listeners functions end
// Event listenerd
socket.on("connect", connectCB);

userSocket.on('connect', userConnectCB);

form.addEventListener("submit", formSubmitCB);

joinRoomButton.addEventListener("click", joinRoomButtonCB);

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}
