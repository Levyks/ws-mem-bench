const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer);


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
httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});