class Socket {
  constructor() {
    this.senderId = null;
    this.senderNick = null;
    this.url = process.env.NEXT_PUBLIC_SOCKET_URL;
    this.socket = null;
  }

  connect(senderId, senderNick = null) {
    if (!this.socket) {
      this.socket = new WebSocket(this.url);
      this.socket.addEventListener("open", () => {
        console.log("socket connect");
        this.senderId = senderId;
        this.senderNick = senderNick;
        this.socket.addEventListener("close", () => this.socket.close());

        if (senderNick) {
          this.send({
            action: "createUser",
            senderId: this.senderId,
            senderNick: this.senderNick,
          });
        } else {
          this.send({
            action: "setConnection",
            senderId: this.senderId,
          });
        }
      });
    }
  }

  send(message) {
    if (!this.socket) return;
    try {
      this.socket.send(JSON.stringify(message));
      console.log("send success");
    } catch (err) {
      throw new Error(err);
    }
  }

  on(eventName, callback) {
    if (!this.socket) return;
    console.log("message event added", callback);
    this.socket.addEventListener(eventName, callback);
  }

  off(eventName, callback) {
    if (!this.socket) return;
    console.log("message event deleted", callback);
    this.socket.removeEventListener(eventName, callback);
  }
}

const socket = new Socket();

export default socket;
