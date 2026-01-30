import React, { useState, useRef, useEffect } from 'react'
import { Phone, Video, Info, Send, Paperclip, Smile, ArrowLeft } from 'lucide-react'
import { getFormattedTimestamp } from '../../utils/formatTime'
import './ChatWindow.css'

interface Message {
  id: string
  sender: string
  senderId: string
  message: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  status: 'online' | 'offline'
  role: string
}

interface ChatWindowProps {
  conversation: Conversation
  messages: Message[]
  onSendMessage: (message: string) => void
  onBackClick?: () => void
}

function ChatWindow({ conversation, messages, onSendMessage, onBackClick }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput)
      setMessageInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="chat-window-container">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          {onBackClick && (
            <button className="back-button" onClick={onBackClick} title="Back to conversations">
              <ArrowLeft size={24} />
            </button>
          )}
          <img src={conversation.avatar} alt={conversation.name} className="chat-header-avatar" />
          <div className="chat-header-info">
            <h2 className="chat-header-name">{conversation.name}</h2>
            <p className="chat-header-status">
              {conversation.status === 'online' ? '🟢 Online' : '⚫ Offline'}
            </p>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="header-action-btn" title="Call">
            <Phone size={20} />
          </button>
          <button className="header-action-btn" title="Video call">
            <Video size={20} />
          </button>
          <button className="header-action-btn" title="Conversation info">
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="messages-empty">
            <div className="empty-message-icon">💬</div>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={message.id} className={`message-wrapper ${message.senderId === 'user' ? 'sent' : 'received'}`}>
              <div className="message-content">
                <div className={`message ${message.senderId === 'user' ? 'sent-message' : 'received-message'}`}>
                  {message.message}
                </div>
                <span className="message-time">
                  {message.timestamp.includes(':') 
                    ? `Today ${message.timestamp}` 
                    : message.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="message-input-container">
        <div className="input-actions">
          <button className="input-action-btn" title="Attach file">
            <Paperclip size={20} />
          </button>
        </div>

        <div className="input-wrapper">
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="message-textarea"
            rows={1}
          />
        </div>

        <div className="input-actions">
          <button className="input-action-btn" title="Emoji">
            <Smile size={20} />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="send-btn"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
