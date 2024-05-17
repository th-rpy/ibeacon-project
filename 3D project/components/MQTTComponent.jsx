import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MQTTComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const brokerUrl = 'mqtt://192.168.155.3:1883';
        const topic = 'distance1';

        const client = mqtt.connect(brokerUrl);

        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`Subscribed to topic: ${topic}`);
                } else {
                    console.error(`Failed to subscribe to topic: ${topic}`, err);
                }
            });
        });

        client.on('message', (topic, message) => {
            const msg = message.toString();
            console.log(`Received message from topic ${topic}: ${msg}`);
            setMessage(msg);
        });

        return () => {
            if (client) {
                client.end();
            }
        };
    }, []);

    return (
        <div>
            <h1>MQTT Messages</h1>
            <p>Latest message on "distance" topic: {message}</p>
        </div>
    );
};

export default MQTTComponent;

