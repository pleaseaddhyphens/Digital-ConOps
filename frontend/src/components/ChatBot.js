import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: 'Hi there! How can I help you?', sender: 'bot' }]);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setMessages([...messages, { text: userInput, sender: 'user' }]);
      setUserInput('');
      // Add response from the bot (static response for now)
      setTimeout(() => {
        setMessages([...messages, { text: userInput, sender: 'user' }, { text: 'This is a bot response.', sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
      <h5>Digital Assistant</h5>
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ textAlign: message.sender === 'bot' ? 'left' : 'right', margin: '5px 0' }}>
            <span style={{
              display: 'inline-block',
              padding: '5px 10px',
              borderRadius: '10px',
              backgroundColor: message.sender === 'bot' ? '#f1f1f1' : '#007bff',
              color: message.sender === 'bot' ? '#000' : '#fff'
            }}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex' }}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={{ flex: '1', marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
