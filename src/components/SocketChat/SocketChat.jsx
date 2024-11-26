import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketChat = () => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const socket = io.connect('http://localhost:5000'); // Замените на адрес вашего сервера

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const handleInputChange = (event) => {
		setNewMessage(event.target.value);
	};

	const sendMessage = () => {
		if (newMessage.trim() !== '') {
			socket.emit('sendMessage', newMessage);
			setNewMessage('');
		}
	};

	return (
		<div>
			<div>
				{messages.map((message, index) => (
					<div key={index}>{message}</div>
				))}
			</div>
			<div>
				<input type="text" value={newMessage} onChange={handleInputChange} />
				<button onClick={sendMessage}>Отправить</button>
			</div>
		</div>
	);
};

export default SocketChat;
