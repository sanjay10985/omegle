"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = exports.GLOBAL_ROOM_ID = void 0;
const RoomManager_1 = require("./RoomManager");
exports.GLOBAL_ROOM_ID = 0;
class UserManager {
    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager_1.RoomManager();
    }
    addUser(name, socket) {
        this.users.push({ name, socket });
        this.queue.push(socket.id);
        this.clearQueue();
    }
    removeUser(socketId) {
        this.users = this.users.filter(x => x.socket.id === socketId);
        this.queue = this.queue.filter(x => x === socketId);
    }
    clearQueue() {
        if (this.queue.length < 2) {
            return;
        }
        const user1 = this.users.find(x => x.socket.id === this.queue.pop());
        const user2 = this.users.find(x => x.socket.id === this.queue.pop());
        if (!user1 || !user2) {
            return;
        }
        const room = this.roomManager.createRoom(user1, user2);
    }
    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            this.roomManager.onOffer(roomId, sdp);
        });
        socket.on("answer", ({ sdp, roomId }) => {
            this.roomManager.onAnswer(roomId, sdp);
        });
    }
    generate() {
        return exports.GLOBAL_ROOM_ID++;
    }
}
exports.UserManager = UserManager;
