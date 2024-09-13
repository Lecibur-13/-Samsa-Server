import kafkaConfig from '../../Config/kafka.config.js';

const consumer = kafkaConfig.consumer({ groupId: 'test-group' });

export default async function TestConsumer() {
    await consumer.connect();
    await consumer.subscribe({
        topic: 'test-topic',
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Message: ${message.value}`);
        }
    });
}
