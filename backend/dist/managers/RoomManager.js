"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = exports.GLOBAL_ROOM_ID = void 0;
exports.GLOBAL_ROOM_ID = 0;
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    createRoom(user1, user2) {
        const roomId = this.generate().toString;
        this.rooms.set(roomId.toString(), {
            user1,
            user2,
        });
        user1.socket.emit("send-offer", {
            roomId
        });
        user2.socket.emit("send-offer", {
            roomId
        });
    }
    onOffer(roomId, sdp) {
        var _a;
        const user2 = (_a = this.rooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.user2;
        user2 === null || user2 === void 0 ? void 0 : user2.socket.emit("offer", {
            sdp
        });
    }
    onAnswer(roomID, sdp) {
        var _a;
        const user1 = (_a = this.rooms.get(roomID)) === null || _a === void 0 ? void 0 : _a.user1;
        user1 === null || user1 === void 0 ? void 0 : user1.socket.emit("offer", { sdp });
    }
    generate() {
        return exports.GLOBAL_ROOM_ID++;
    }
}
exports.RoomManager = RoomManager;
