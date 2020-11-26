const users = [];

function joinUser(userId, userName, room) {
    const user = [userId, userName, room];

    users.push(user);

    return user;
}


function getUserById(userId) {
    return users.find((user) => user.id === userId)
}

module.exports = {
    joinUser,
    getUserById
};
