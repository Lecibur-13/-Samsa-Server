import kafkaConfig from '../../Config/kafka.config.js';

const producer = kafkaConfig.producer();

export default async function CreateMessage(message) {
    try {
        await producer.connect();
        await producer.send({
            topic: 'test-topic',
            messages: [
                { value: message },
            ],
        });
    } catch (err) {
        console.error('Error sending the message:', err);
    } finally {
        await producer.disconnect();
    }
};
  