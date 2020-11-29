const users = [];

function joinUser(userId, userName, room) {
    const user = {userId, userName, room};

    users.push(user);

    return user;
}


function getUserById(userId) {
    return users.find(user => user.userId === userId)
}

function userLeave(userId) {
    const index = users.findIndex(user => user.userId === userId);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getRoomsUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    joinUser,
    getUserById,
    userLeave,
    getRoomsUsers
};
