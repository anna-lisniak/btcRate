const amqp = require('amqplib');

class LoggerService {
    constructor(amqpServer, queue) {
        this.amqpServer = amqpServer;
        this.queue = queue;
    }

    logs = [];

    async createChannel() {
        const connection = await amqp.connect(this.amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue(this.queue);

        return channel;
    }

    listenChannel(channel) {
        channel.consume(this.queue, (msg) => this.consumer(channel, msg));
    }

    consumer(channel, msg) {
        const typeActions = {
            'debug': this._debugHandler,
            'info': this._infoHandler,
            'error': this._errorHandler,
        }

        const {type, message} = this._parse(msg.content);

        const action = typeActions[type];
        if(!action) return;

        action(message);

        channel.ack(msg)
    }

    _parse(message) {
        return JSON.parse(message);
    }

    _debugHandler = (msg) => {
        this.logs.push(msg);
    }
    _infoHandler = (msg) => {
        this.logs.push(msg);
    }
    _errorHandler = (msg) => {
        this.logs.push(msg);
        console.log("ERROR  --->", msg);
    }
}

module.exports = LoggerService;