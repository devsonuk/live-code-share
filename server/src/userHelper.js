const users = [];

// join user to chat
function userJoin({ id, name, roomId }) {
  const user = { id, name, roomId };
  users.push(user);
  return user;
}

function addUser(user) {
  users.push(user);
}

//Get current user
function getUser(id) {
  var user = users.find((u) => u.id == id);
  return user;
}

function removeUser(socketId) {
  var idx = users.findIndex((u) => u.socketId == socketId);
  if (idx >= 0) {
    return users.splice(idx, 1)[0];
  }
}

function getRoomUsers(roomId) {
  return users.filter((u) => u.roomId == roomId);
}

module.exports = {
  userJoin,
  getUser,
	removeUser,
	getRoomUsers,
  addUser
};
