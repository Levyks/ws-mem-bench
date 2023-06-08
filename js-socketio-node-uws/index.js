const { App } = require('uWebSockets.js');
const { Server } = require("socket.io");

const app = App();
const io = new Server();
io.attachApp(app);

class Room {
    constructor(id) {
        this.id = id;
        this.users = [];
    }

    addUser(username, socket) {
        socket.join(this.id);
        this.users.push({ username, socket });
        socket.to(this.id).emit("user-joined", username);
    }

    static getOrCreate(id) {
        const room = rooms.get(id);
        if (room) return room;
        const newRoom = new Room(id);
        rooms.set(id, newRoom);
        return newRoom;
    }
}

const rooms = new Map();

io.on("connection", (socket) => {
    socket.on("join", (roomId, username, cb) => {
        const room = Room.getOrCreate(roomId);
        room.addUser(username, socket);
        cb(room.users.map(u => u.username));
    });
});

const port = process.env.PORT || 3000;
app.listen(port, (token) => {
    if (!token) {
        console.warn("port already in use");
    }
});