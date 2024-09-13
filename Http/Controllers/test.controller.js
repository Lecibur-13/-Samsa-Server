import CreateMessage from '../Producer/test.producer.js';

async function TestController(req, res) {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'The "message" field is required' });
    }

    // Send the message to Kafka using the Producer
    try {
        await CreateMessage(JSON.stringify(message));

        return res.status(200).json({ success: true, message: 'Message successfully sent' });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error sending the message' });
    }
}

export { TestController };