const amqp = require('amqplib');

class LoggerService {
    constructor(amqpServer, queue) {
        this.amqpServer = amqpServer;
        this.queue = queue;
    }

    async createChannel() {
        const connection = await amqp.connect(this.amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue(this.queue);

        return channel;
    };

    _prepareMessage(data) {
        return Buffer.from(JSON.stringify(data));
    }

    sendMessage(channel, type, message) {
        const data = this._prepareMessage({ type, message });
        channel.sendToQueue(this.queue, data)
    };
}

module.exports = LoggerService;