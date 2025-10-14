import React, { useState } from "react";
import axios from "axios";
import "./FloatingChatBot.css"; 

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:9097/chat/ask", {
        role: role,
        message: input,
      });
      
      const reply = response.data.message;
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, I'm having trouble connecting right now. Please try again later." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const resetChat = () => {
    setRole("");
    setMessages([]);
  };

  return (
    <div className="floating-chatbot">
      {/* Floating Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
      >
        <i className="fas fa-comment-medical"></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <i className="fas fa-robot"></i>
              <span>PharmaCare Assistant</span>
            </div>
            <div className="chatbot-actions">
              <button className="reset-btn" onClick={resetChat} title="Reset Chat">
                <i className="fas fa-redo"></i>
              </button>
              <button className="close-btn" onClick={toggleChat} title="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="chatbot-content">
            {!role ? (
              <div className="role-selection">
                <div className="welcome-message">
                  <i className="fas fa-hand-wave"></i>
                  <h3>Welcome to PharmaCare Assistant!</h3>
                  <p>Please select your role to get started:</p>
                </div>
                <div className="role-buttons">
                  <button 
                    className="role-btn doctor"
                    onClick={() => setRole("doctor")}
                  >
                    <i className="fas fa-user-md"></i>
                    <span>Doctor</span>
                  </button>
                  <button 
                    className="role-btn admin"
                    onClick={() => setRole("admin")}
                  >
                    <i className="fas fa-user-cog"></i>
                    <span>Admin</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="messages-container">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`message ${msg.from === 'user' ? 'user-message' : 'bot-message'}`}
                    >
                      <div className="message-content">
                        {msg.text}
                      </div>
                      <div className="message-time">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="typing-indicator">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span>PharmaCare Assistant is typing...</span>
                    </div>
                  )}
                </div>
                
                <div className="input-container">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here..."
                      className="chat-input"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="send-button"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatBot;