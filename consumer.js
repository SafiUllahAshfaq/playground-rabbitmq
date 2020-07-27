const amqp = require('amqplib');

const msg = { number: 2 };

connect();

async function connect() {
	try {
		const connStr = 'amqp://localhost:5672';

		const conn = await amqp.connect(connStr);

		const channel = await conn.createChannel();

		const result = await channel.assertQueue('jobs');

		channel.consume('jobs', (msg) => {
			const input = JSON.parse(msg.content.toString(), undefined, 2);

			if (parseInt(input.number) === 2) channel.ack(msg);

			console.log(input);
		});
	} catch (error) {
		console.error(error);
	}
}
