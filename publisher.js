const amqp = require('amqplib');

const msg = { number: process.argv[2] || 0 };

connect();

async function connect() {
	try {
		const connStr = 'amqp://localhost:5672';

		const conn = await amqp.connect(connStr);

		const channel = await conn.createChannel();

		const result = await channel.assertQueue('jobs');

		channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)));

		console.log('Job sent successfully!! ', msg);
	} catch (error) {
		console.error(error);
	}
}
