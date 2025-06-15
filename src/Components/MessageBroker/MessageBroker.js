import React, { useEffect, useState, useRef } from "react";

class Message {
    constructor(id,clientId, message, userId) {
        this.id = id; 
        this.clientId = clientId;
        this.message = message;
        this.userId = userId;
    }}



function MessageBroker(props) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [clientId, setClientId] = useState("");
    const userIdRef = useRef(Math.random().toString(36).slice(2)); // unique per tab

    const sendMessage = async () => {
    if (!input.trim() || !clientId) return;
    await fetch(`http://localhost:3000/api/stream/${clientId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userId: userIdRef.current })
    });
    setInput("");
};

useEffect(() => {
    if (!clientId) return;
    setMessages([]);
    const es = new EventSource(`http://localhost:3000/api/events/${clientId}?fromId=0&userId=${userIdRef.current}`);

    es.onmessage = e => {
        try {
            const data = JSON.parse(e.data);
            console.log("Received message:", new Message(data.id, data.clientId, data.message, data.userId));
            setMessages(prev => [
                ...prev,
                new Message(data.id, data.clientId, data.message, data.userId)
            ]);
        } catch {}
    };

    return () => es.close();
}, [clientId]);

    return (
        <div style={{ padding: "20px", fontSize: "20px" }}>
            <h1>{props.title || "Message Broker"}</h1>
            <div>
                <label>
                    Select Client:{" "}
                    <select value={clientId} onChange={e => setClientId(e.target.value)}>
                        <option value="">-- Select client --</option>
                        <option value="client1">client1</option>
                        <option value="client2">client2</option>
                        <option value="client3">client3</option>
                        <option value="client4">client4</option>
                    </select>
                </label>
            </div>
            <div>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message"
                    disabled={!clientId }
                />
                <button onClick={sendMessage} disabled={!clientId || !input.trim() }>Send</button>
            </div>
            <h2>Messages:</h2>

            <ul>
                {messages
                    .filter(msg => msg.clientId === clientId)
                    .map((msg, idx) => (
                        <li key={msg.id || idx}>
                            <b>{msg.clientId}:</b> {msg.message}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default MessageBroker;